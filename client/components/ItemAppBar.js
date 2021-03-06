import PropTypes from 'prop-types';
import React from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, withFirestore } from "react-redux-firebase";

import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import TextField from 'material-ui/TextField';
import CloseIcon from 'material-ui-icons/Close';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Menu, { MenuItem } from 'material-ui/Menu';
import Dialog, { DialogActions, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import {
    dispatchAction,
    getSelectedItem,
    getLocalProperties,
    selectedItemIsNew,
    createFirestoreQueryPath,
    excludedProperties,
} from "../helpers";
import TopDrawer from "./TopDrawer";
import {
    clearRunningUpdater,
    TimerRunningIcon,
} from "./TimerButton";

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
    },
};

const handleOnRightCancelButtonClick = (
    e,
    {
        cancelPageMenu,
    },
) => cancelPageMenu();

const handleMenuItemDeleteOnClick = (
    e,
    props,
) => {
    const {
        firestore,
        addSession,
        closeMenuAndShowDeleteSelector,
        editItemTitle,
        params,
    } = props;
    const {
        uid,
        topicId,
        sessionId,
    } = params;
    const selectedItem = getSelectedItem(props, "code");
    if (selectedItemIsNew(props, "code")) {
        if (sessionId) {
            addSession(selectedItem, sessionId, topicId);
        } else {
            dispatchAction(props, "addItem");
        }
        firestore.set(
            createFirestoreQueryPath(uid, true, topicId, null, sessionId),
            _.omit(selectedItem, excludedProperties),
        );
    } else {
        closeMenuAndShowDeleteSelector();
    }
    editItemTitle(false);
}

const CancelDeleteButton = ({ toDelete, ...props }) => {
    const {
        openDialog,
    } = props;
    const handleOnRightDeleteButtonClick = (e) => {
        openDialog(true);
    }
    return (
        <span>
            <IconButton
                onClick={ (e) => handleOnRightCancelButtonClick(e, props) }
                color="inherit"
            >
                <Typography
                    variant="button"
                    color="inherit">
                    Cancel
                </Typography>
            </IconButton>
                |
            <IconButton
                onClick={ handleOnRightDeleteButtonClick }
                color="inherit"
                disabled={ toDelete.length <= 0 }
            >
                <Typography
                    variant="button"
                    color="inherit">
                    Delete
                </Typography>
            </IconButton>
            <TopDrawer { ...props } />
        </span>
    );
}

const MenuButton = (props) => {
    const {
        supervisor,
        classes,
        firebase,
        openMenu,
        params,
    } = props;
    const {
        topicId,
    } = params;
    const handleMenuButtonOnClick = (e) => {
        openMenu(true, e.currentTarget);
    }
    const handleMenuItemLogoutOnClick = () => {
        firebase.logout();
    }
    return (
        <div>
            <IconButton
                className={ classes.menuButton }
                onClick={ handleMenuButtonOnClick }
                color="inherit">
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={ supervisor.menuAnchor }
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={ Boolean(supervisor.menuAnchor) }
                onClose={ (e) => handleOnRightCancelButtonClick(e, props) }
            >
                <MenuItem
                    onClick={ (e) => handleMenuItemDeleteOnClick(e, props) }
                >
                    { topicId ? "Delete Sessions" : "Delete Topics" }
                </MenuItem>
                <MenuItem
                    onClick={ handleMenuItemLogoutOnClick }
                >
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}

const DeleteConfirmationDialog = (props) => {
    const {
        supervisor,
        openDialog,
        closeDeleteDialogAndCancelPageMenu,
        removeItem,
        deleteSession,
        firestore,
        params,
        sessions,
        sessionIsRunning,
    } = props;
    const {
        uid,
        topicId,
        sessionId,
    } = params;
    const manageItemsMarkedForDeletion = (manager) => {
        const toDelete = _.get(supervisor, "toDelete", []).slice();
        closeDeleteDialogAndCancelPageMenu();
        toDelete.map(manager);
    }
    const handleDeleteConfirmedOnClick = (e) => {
        const removeSession = (session, sessionId, topicId) => {
            const type = "session";
            // if we're removing the running session then clean up...
            if (_.get(supervisor, "isRunning.sessionId", -1) === sessionId) {
                sessionIsRunning(false);
                clearRunningUpdater();
            }
            deleteSession(session, sessionId, topicId, false);
            firestore.deleteRef(createFirestoreQueryPath(uid, true, topicId, true, sessionId));
        }
        manageItemsMarkedForDeletion((itemId) => {
            if (topicId) {
                const selectedSession = sessions[topicId].find((sess) => _.get(sess, "code", -1) === itemId);
                removeSession(selectedSession, itemId, topicId);
            } else {
                const type = "topic";
                // don't use handler dispatchAction as session id is not in URL
                removeItem("topic", itemId);
                // Remove the sessions belonging to the topic or they'll remain in the datastore
                sessions[itemId].map((sess) => removeSession(sess, _.get(sess, "code", -1), itemId));
                firestore.deleteRef(createFirestoreQueryPath(uid, true, itemId));
            }
        });
    }
    const handleCancelConfirmedOnClick = (e, props) => {
        handleOnRightCancelButtonClick(e, props);
        openDialog(false);
    }
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            open={ supervisor.openDialog }
        >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogActions>
                <Button
                    onClick={ (e) => handleCancelConfirmedOnClick(e, props) }
                    color="primary"
                >
                    Cancel
                </Button>
                <Button
                    onClick={ handleDeleteConfirmedOnClick }
                    color="primary"
                >
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const TitleTextField = (props) => {
    const {
        classes,
        topicId,
        supervisor,
    } = props;
    const handleTitleOnChange = (e) => {
        dispatchAction(props, "updateItemProperty", "title", e.target.value);
    }
    if (!topicId) {
        return "Topics";
    } else {
        const {
            type,
            targetArray,
            selectionValue
        } = getLocalProperties(props);
        const selectedItem = getSelectedItem(props, "code");
        const itemIsNew = selectedItemIsNew(props, "code");
        const defaultTitle = itemIsNew ? `New ${ type }` : `Edit ${ type }`;
        const title = selectedItem.title || defaultTitle;
        const isEditingTitle = (supervisor.isEditingTitle === selectedItem.code);
        if (isEditingTitle) {
            if (itemIsNew) {
                return (
                    <TextField
                        className={classes.flex}
                        fullWidth={ true }
                        placeholder={ title }
                        onChange={ handleTitleOnChange }
                    />
                )
            } else {
                return (
                    <TextField
                        className={classes.flex}
                        fullWidth={ true }
                        defaultValue={ title }
                        onChange={ handleTitleOnChange }
                    />
                )
            }
        } else {
            return title;
        }
    }
}

class ItemAppBar extends React.Component {
    componentWillUnmount() {
        const props = this.props;
        const {
            displayDeleteSelectorAndMenu,
            firestore,
            params,
            editItemTitle,
            topics,
            sessions,
            supervisor,
        } = props;
        const {
            uid,
        } = params;
        const updateItem = (selectedItem, tId, sId) => {
            if (selectedItem && !_.isUndefined(selectedItem)) {
                firestore.update(
                    createFirestoreQueryPath(uid, null, tId, null, sId),
                    _.omit(selectedItem, excludedProperties),
                );
            }
        }
        const persistItemsRequiringUpdate = () => {
            const topicsRequiringUpdate = _.get(supervisor, "requiresUpdate.topics", []);
            const sessionsRequiringUpdate = _.get(supervisor, "requiresUpdate.sessions", {});
            if (selectedItemIsNew(props, "code")) {
                dispatchAction(props, "removeItem");
            }
            _.each(topicsRequiringUpdate, (tId) => updateItem(
                topics.find((topic) => _.get(topic, "code", -1) === tId),
                tId,
            ));
            _.each(sessionsRequiringUpdate, (sessionIds, tId) => {
                _.each(sessionIds, (sId) => {
                    updateItem(
                        sessions[tId].find((sess) => _.get(sess, "code", -1) === sId),
                        tId,
                        sId,
                    )
                })
            });
        }
        persistItemsRequiringUpdate();
        displayDeleteSelectorAndMenu(false);
        editItemTitle(false);
    }
    render() {
        const props = this.props;
        const {
            router,
            displayDeleteSelectorAndMenu,
            supervisor,
            params,
            classes,
            editItemTitle,
            removeItem,
            firebase,
            sessions,
            sessionIsRunning,
        } = props;
        const {
            topicId,
            sessionId,
        } = params;
        const redirectHome = () => {
            router.goBack();
            displayDeleteSelectorAndMenu(false);
        }
        const handleOnTitleClick = (e) => {
            if (topicId && !sessionId) {
                editItemTitle(true, topicId);
            }
        }
        const handleOnLeftIconButtonClick = (e) => {
            redirectHome();
        }
        const handleMenuItemLogoutOnClick = () => {
            firebase.logout();
        }
        const handleCloseOnClick = (e) => {
            if (topicId) {
                const type = "session";
                // don't use handler dispatchAction as session id is not in URL
                removeItem("session", sessionId, topicId);
                // if we're removing the running session then clean up...
                sessionIsRunning(false);
                clearRunningUpdater();
            } else {
                const type = "topic";
                // don't use handler dispatchAction as session id is not in URL
                removeItem("topic", topicId);
            }
        }
        const renderIconElementLeft = () => {
            if (selectedItemIsNew(props, "code")) {
                return (
                    <CloseIcon
                        onClick={ handleCloseOnClick }
                    />
                );
            } else {
                return (
                    <ArrowBackIcon />
                );
            }
        }
        const renderIconElementRight = () => {
            const toDelete = supervisor.toDelete || [];
            if (selectedItemIsNew(props, "code")) {
                return (
                    <IconButton
                        className={classes.menuButton}
                        onClick={ (e) => handleMenuItemDeleteOnClick(e, props) }
                        color="inherit">
                        <Typography
                            variant="button"
                            color="inherit">
                            Save
                        </Typography>
                    </IconButton>
                );
            } else if (supervisor.deleteRequested) {
                return (
                    <CancelDeleteButton
                        { ...props }
                        toDelete={ toDelete }
                    />
                );
            } else {
                const sessions = props.sessions[topicId] || [];
                if (!topicId || (!sessionId && (sessions.length > 0))) {
                    return (
                        <MenuButton
                            { ...props }
                        />
                    );
                }
            }
        }
        const renderAppBar = () => {
            const selectedItem = getSelectedItem(props, "code");
            const isEditingTitle = (supervisor.isEditingTitle === selectedItem.code);
            return (
                <div
                    className={classes.root}>
                    <AppBar
                        position="static"
                        color="primary">
                        <Toolbar>
                            { params.topicId && (
                                <IconButton
                                    onClick={ handleOnLeftIconButtonClick }
                                    className={classes.menuButton}
                                    color="inherit">
                                    { renderIconElementLeft() }
                                </IconButton>
                            ) }
                            <Typography
                                onClick={ (e) => {
                                    if (!isEditingTitle) {
                                        handleOnTitleClick(e);
                                    }
                                } }
                                variant="title"
                                color="inherit"
                                className={classes.flex}>
                                <TitleTextField
                                    { ...props }
                                    topicId={ topicId }
                                />
                            </Typography>
                            <TimerRunningIcon
                                { ...props }
                            />
                            { renderIconElementRight() }
                        </Toolbar>
                    </AppBar>
                    <DeleteConfirmationDialog
                        { ...props }
                    />
                </div>
            );
        }
        return renderAppBar();
    }
}

ItemAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    firebaseConnect(),
    withFirestore,
    connect(({ firebase: { auth } }) => ({ auth }))
)(withStyles(styles)(ItemAppBar));
