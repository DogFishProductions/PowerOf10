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
import DeleteIcon from 'material-ui-icons/Delete';

import { dispatchAction, getSelectedItem, getLocalProperties } from "../helpers";
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
        this.props.deleteRequested(false);
        this.props.displaySelectForDeletion(false);
    },
    redirectHome() {
        this.props.history.goBack();
        this.props.deleteRequested(false);
        this.props.displaySelectForDeletion(false);
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
        const { sessionId } = this.props.params;
        if (!sessionId) {
            dispatchAction(this.props, "updateItemProperty", "isEditingTitle", true);
        }
    },
    handleOnLeftIconButtonClick(e) {
        const selectedItem = getSelectedItem(this.props, "code");
        if (selectedItem.isNew) {
            dispatchAction(this.props, "removeItem");
        } else if (selectedItem.isEditingTitle) {
            dispatchAction(this.props, "updateItemProperty", "isEditingTitle", false);
        }
        this.redirectHome();
    },
    handleOnRightIconButtonClick(e) {
        const selectedItem = getSelectedItem(this.props, "code");
        if (selectedItem.isNew) {
            dispatchAction(this.props, "updateItemProperty", "isNew", false);
            dispatchAction(this.props, "addItem");
            this.redirectHome();
        } else if (selectedItem.isEditingTitle) {
            dispatchAction(this.props, "updateItemProperty", "isEditingTitle", false);
            dispatchAction(this.props, "addItem");
        } else {
            this.props.deleteRequested(true);
            this.props.displaySelectForDeletion(true);
        }
    },
    handleOnRightCancelButtonClick(e) {
        const {
            deselectForDeletion,
            params,
        } = this.props;
        this.manageItemsMarkedForDeletion((sessionId) => {
            // don't use handler dispatchAction as session id is not in URL
            deselectForDeletion("session", sessionId);
        })
    },
    handleOnRightDeleteButtonClick(e) {
        const {
            removeItem,
            params,
        } = this.props;
        const topicId = params.topicId;
        this.manageItemsMarkedForDeletion((sessionId) => {
            // don't use handler dispatchAction as session id is not in URL
            removeItem("session", sessionId, topicId);
        })
    },
    handleTitleOnChange(e) {
        dispatchAction(this.props, "updateItemProperty", "title", e.target.value);
    },
    renderTitle() {
        const { classes } = this.props;
        const {
            type,
            targetArray,
            selectionValue
        } = getLocalProperties(this.props);
        const selectedItem = getSelectedItem(this.props, "code");
        const defaultTitle = selectedItem.isNew ? `New ${ type }` : `Edit ${ type }`;
        const title = selectedItem.title || defaultTitle;
        if (selectedItem.isEditingTitle) {
            if (selectedItem.isNew) {
                return (
                    <TextField
                        className={classes.textField}
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
    },
    renderIconElementLeft() {
        const selectedItem = getSelectedItem(this.props, "code");
        if (selectedItem.isNew) {
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
        const {
            classes,
            supervisor,
        } = this.props;
        const selectedItem = getSelectedItem(this.props, "code");
        const toDelete = supervisor.toDelete || [];
        if (selectedItem.isNew) {
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
                    <TopDrawer { ...this.props } />
                </span>
            );
        } else {
            const { topicId } = this.props.params;
            const sessions = this.props.sessions[topicId] || [];
            if (sessions.length > 0) {
                return (
                    <IconButton
                        className={classes.menuButton}
                        onClick={ this.handleOnRightIconButtonClick }
                        color="inherit">
                        <DeleteIcon />
                    </IconButton>
                );
            }
        }
    },
    renderAppBar() {
        const { classes } = this.props;
        const selectedItem = getSelectedItem(this.props, "code");
        return (
            <div
                className={classes.root}>
                <AppBar
                    position="static"
                    color="primary">
                    <Toolbar>
                        <IconButton
                            onClick={ this.handleOnLeftIconButtonClick }
                            className={classes.menuButton}
                            color="inherit">
                            { this.renderIconElementLeft() }
                        </IconButton>
                        <Typography
                            onClick={ (e) => {
                                if (!selectedItem.isEditingTitle) {
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
