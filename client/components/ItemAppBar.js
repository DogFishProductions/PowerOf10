import React from 'react';

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

const ItemAppBar = React.createClass({
    componentWillUnmount() {
        const {
            deleteRequested,
            displaySelectForDeletion
        } = this.props;
        deleteRequested(false);
        displaySelectForDeletion(false);
    },
    redirectHome() {
        const {
            history,
            deleteRequested,
            displaySelectForDeletion
        } = this.props;
        history.goBack();
        deleteRequested(false);
        displaySelectForDeletion(false);
    },
    manageItemsMarkedForDeletion(manager) {
        const {
            deleteRequested,
            displaySelectForDeletion,
            supervisor,
        } = this.props;
        deleteRequested(false);
        displaySelectForDeletion(false);
        const toDelete = supervisor.toDelete || [];
        toDelete.map(manager);
    },
    handleOnTitleClick(e) {
        const props = this.props;
        const {
            topicId,
            sessionId,
        } = props.params;
        if (topicId && !sessionId) {
            props.editItemTitle(true, topicId);
        }
    },
    handleOnLeftIconButtonClick(e) {
        const props = this.props;
        const selectedItem = getSelectedItem(props, "code");
        if (selectedItemIsNew(props, "code")) {
            dispatchAction(props, "removeItem");
        }
        props.editItemTitle(false);
        this.redirectHome();
    },
    handleOnRightIconButtonClick(e) {
        const props = this.props;
        const {
            openMenu,
            deleteRequested,
            displaySelectForDeletion,
        } = props;
        const selectedItem = getSelectedItem(props, "code");
        if (selectedItemIsNew(props, "code")) {
            dispatchAction(props, "addItem");
            this.redirectHome();
        } else {
            deleteRequested(true);
            displaySelectForDeletion(true);
            openMenu(false);
        }
        props.editItemTitle(false);
    },
    handleOnRightCancelButtonClick(e) {
        const {
            deselectAllForDeletion,
            deleteRequested,
            displaySelectForDeletion,
            openMenu,
        } = this.props;
        displaySelectForDeletion(false);
        deleteRequested(false);
        deselectAllForDeletion();
        openMenu(false);
    },
    handleOnRightDeleteButtonClick(e) {
        this.props.openDialog(true);
    },
    handleDeleteConfirmedOnClick(e) {
        const {
            removeItem,
            params,
            openDialog,
        } = this.props;
        openDialog(false);
        const topicId = params.topicId;
        this.manageItemsMarkedForDeletion((itemId) => {
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
    },
    handleCancelConfirmedOnClick(e) {
        this.props.openDialog(false);
    },
    handleMenuButtonOnClick(e) {
        this.props.openMenu(true, e.currentTarget);
    },
    handleTitleOnChange(e) {
        dispatchAction(this.props, "updateItemProperty", "title", e.target.value);
    },
    renderTitle() {
        const props = this.props;
        const {
            classes,
            supervisor,
            params,
        } = props;
        if (!params.topicId) {
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
                            onChange={ this.handleTitleOnChange }
                        />
                    )
                } else {
                    return (
                        <TextField
                            className={classes.flex}
                            fullWidth={ true }
                            defaultValue={ title }
                            onChange={ this.handleTitleOnChange }
                        />
                    )
                }
            } else {
                return title;
            }
        }
    },
    renderIconElementLeft() {
        if (selectedItemIsNew(this.props, "code")) {
            return (
                <CloseIcon />
            );
        } else {
            return (
                <ArrowBackIcon />
            );
        }
    },
    renderIconElementRight() {
        const props = this.props;
        const {
            classes,
            supervisor,
            params,
        } = props;
        const toDelete = supervisor.toDelete || [];
        if (selectedItemIsNew(props, "code")) {
            return (
                <IconButton
                    className={classes.menuButton}
                    onClick={ this.handleOnRightIconButtonClick }
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
                        onClick={ this.handleOnRightCancelButtonClick }
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
                        onClick={ this.handleOnRightDeleteButtonClick }
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
            const {
                topicId,
                sessionId,
            } = params;
            const sessions = this.props.sessions[topicId] || [];
            if (!topicId || (!sessionId && (sessions.length > 0))) {
                return (
                    <div>
                        <IconButton
                            className={ classes.menuButton }
                            onClick={ this.handleMenuButtonOnClick }
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
                            onClose={ this.handleOnRightCancelButtonClick }
                            >
                            <MenuItem
                                onClick={ this.handleOnRightIconButtonClick }
                            >
                                { topicId ? "Delete Sessions" : "Delete Topics" }
                            </MenuItem>
                        </Menu>
                    </div>
                );
            }
        }
    },
    renderAppBar() {
        const props = this.props;
        const {
            classes,
            supervisor,
            params,
            openDialog,
        } = props;
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
                                onClick={ this.handleOnLeftIconButtonClick }
                                className={classes.menuButton}
                                color="inherit">
                                { this.renderIconElementLeft() }
                            </IconButton>
                        ) }
                        <Typography
                            onClick={ (e) => {
                                if (!isEditingTitle) {
                                    this.handleOnTitleClick(e);
                                }
                            } }
                            variant="title"
                            color="inherit"
                            className={classes.flex}>
                            { this.renderTitle() }
                        </Typography>
                        { this.renderIconElementRight() }
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
                            onClick={ this.handleCancelConfirmedOnClick }
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={ this.handleDeleteConfirmedOnClick }
                            color="primary"
                        >
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    },
    render() {
        return this.renderAppBar();
    }
});

ItemAppBar.propTypes = {
    classes: React.PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemAppBar);
