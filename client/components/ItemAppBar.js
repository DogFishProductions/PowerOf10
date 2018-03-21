import PropTypes from 'prop-types';
import React from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { withFirestore } from 'react-redux-firebase'

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
} from "../helpers";
import TopDrawer from "./TopDrawer";

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

class ItemAppBar extends React.Component {
    componentWillUnmount() {
        const {
            deleteRequested,
            displaySelectForDeletion
        } = this.props;
        deleteRequested(false);
        displaySelectForDeletion(false);
    }
    render() {
        const props = this.props;
        const {
            router,
            deleteRequested,
            displaySelectForDeletion,
            deselectAllForDeletion,
            supervisor,
            openMenu,
            removeItem,
            params,
            openDialog,
            classes,
            editItemTitle,
            firebase,
        } = props;
        const {
            uid,
            topicId,
            sessionId,
        } = params;
        const redirectHome = () => {
            router.goBack();
            deleteRequested(false);
            displaySelectForDeletion(false);
        }
        const manageItemsMarkedForDeletion = (manager) => {
            deleteRequested(false);
            displaySelectForDeletion(false);
            const toDelete = supervisor.toDelete || [];
            toDelete.map(manager);
        }
        const handleOnTitleClick = (e) => {
            if (topicId && !sessionId) {
                editItemTitle(true, topicId);
            }
        }
        const handleOnLeftIconButtonClick = (e) => {
            const selectedItem = getSelectedItem(props, "code");
            if (selectedItemIsNew(props, "code")) {
                dispatchAction(props, "removeItem");
            }
            editItemTitle(false);
            redirectHome();
        }
        const handleOnRightIconButtonClick = (e) => {
            const selectedItem = getSelectedItem(props, "code");
            if (selectedItemIsNew(props, "code")) {
                dispatchAction(props, "addItem");
                if (sessionId) {
                    // save session to database
                } else {
                    this.props.firestore.set({
                            collection: "users",
                            doc: uid,
                            subcollections: [
                                {
                                    collection: "topics",
                                    doc: topicId,
                                },
                            ],
                        },
                        selectedItem,
                    );
                }
            } else {
                deleteRequested(true);
                displaySelectForDeletion(true);
                openMenu(false);
            }
            editItemTitle(false);
        }
        const handleOnRightCancelButtonClick = (e) => {
            displaySelectForDeletion(false);
            deleteRequested(false);
            deselectAllForDeletion();
            openMenu(false);
        }
        const handleOnRightDeleteButtonClick = (e) => {
            openDialog(true);
        }
        const handleDeleteConfirmedOnClick = (e) => {
            openDialog(false);
            manageItemsMarkedForDeletion((itemId) => {
                if (topicId) {
                    const type = "session";
                    // don't use handler dispatchAction as session id is not in URL
                    removeItem("session", itemId, topicId);
                } else {
                    const type = "topic";
                    // don't use handler dispatchAction as session id is not in URL
                    removeItem("topic", itemId);
                }
            });
        }
        const handleCancelConfirmedOnClick = (e) => {
            openDialog(false);
        }
        const handleMenuButtonOnClick = (e) => {
            openMenu(true, e.currentTarget);
        }
        const handleTitleOnChange = (e) => {
            dispatchAction(props, "updateItemProperty", "title", e.target.value);
        }
        const handleLogoutOnClick = () => {
            firebase.logout();
        }
        const renderTitle = () => {
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
        const renderIconElementLeft = () => {
            if (selectedItemIsNew(props, "code")) {
                return (
                    <CloseIcon />
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
                        onClick={ handleOnRightIconButtonClick }
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
                    <span>
                        <IconButton
                            onClick={ handleOnRightCancelButtonClick }
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
            } else {
                const sessions = props.sessions[topicId] || [];
                if (!topicId || (!sessionId && (sessions.length > 0))) {
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
                                onClose={ handleOnRightCancelButtonClick }
                                >
                                <MenuItem
                                    onClick={ handleOnRightIconButtonClick }
                                >
                                    { topicId ? "Delete Sessions" : "Delete Topics" }
                                </MenuItem>
                                <MenuItem
                                    onClick={ handleLogoutOnClick }
                                >
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
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
                                { renderTitle() }
                            </Typography>
                            { renderIconElementRight() }
                        </Toolbar>
                    </AppBar>
                    <Dialog
                        disableBackdropClick
                        disableEscapeKeyDown
                        maxWidth="xs"
                        open={ supervisor.openDialog }
                    >
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogActions>
                            <Button
                                onClick={ handleCancelConfirmedOnClick }
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
