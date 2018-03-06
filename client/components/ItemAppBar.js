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

let deleteRequested = false;

const ItemAppBar = React.createClass({
    componentWillUnmount() {
        deleteRequested = false;
    },
    redirectHome() {
        this.props.history.goBack();
        deleteRequested = false;
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
            deleteRequested = true;
            this.forceUpdate();
        }
    },
    handleOnRightCancelButtonClick(e) {
        deleteRequested = false;
        this.forceUpdate();
    },
    handleOnRightDeleteButtonClick(e) {
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
        const { classes } = this.props;
        const selectedItem = getSelectedItem(this.props, "code");
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
        } else if (deleteRequested) {
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
                        disabled={ true }
                    >
                        <Typography
                            variant="button"
                            color="inherit">
                            Delete
                        </Typography>
                    </IconButton>
                </span>
            );
        } else {
            return (
                <IconButton
                    className={classes.menuButton}
                    onClick={ this.handleOnRightIconButtonClick }
                    color="inherit">
                    <DeleteIcon />
                </IconButton>
            );
        }
    },
    renderAppBar() {
        const { classes } = this.props;
        const selectedItem = getSelectedItem(this.props, "code");
        if (selectedItem.isEditingTitle) {
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
                                variant="title"
                                color="inherit">
                                { this.renderTitle() }
                            </Typography>
                            { this.renderIconElementRight() }
                        </Toolbar>
                    </AppBar>
                </div>
            );
        } else {
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
                                onClick={ this.handleOnTitleClick }
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
        }
    },
    render() {
        return this.renderAppBar();
    }
});

ItemAppBar.propTypes = {
    classes: React.PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemAppBar);

