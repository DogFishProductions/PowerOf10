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
    marginRight: 20,
  },
};

const ItemAppBar = React.createClass({
    redirectHome() {
        this.props.history.push("/");
    },
    handleOnTitleClick(e) {
        dispatchAction(this.props, "beginEditItemTitle");
    },
    handleOnLeftIconButtonClick(e) {
        const selectedItem = getSelectedItem(this.props, "code");
        if (selectedItem.isNew) {
            dispatchAction(this.props, "removeItem");
        } else if (selectedItem.isEditingTitle) {
            dispatchAction(this.props, "endEditItemTitle");
        }
        this.redirectHome();
    },
    handleOnRightIconButtonClick(e) {
        dispatchAction(this.props, "addItem");
        this.redirectHome();
    },
    handleTitleOnChange(e) {
        return dispatchAction(this.props, "updateItemTitle", e.target.value);
    },
    renderTitle() {
        const { classes } = this.props;
        const {
            type,
            targetArray,
            selectionValue
        } = getLocalProperties(this.props);
        const selectedItem = getSelectedItem(this.props, "code");
        const title = selectedItem.title || `New ${ type }`;
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
        const selectedItem = getSelectedItem(this.props, "code");
        if (selectedItem.isNew) {
            return (
                <Typography
                    variant="button"
                    color="inherit">
                    Save
                </Typography>
            );
        } else {
            return (
                <MoreVertIcon />
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
                            <IconButton
                                className={classes.menuButton}
                                onClick={ this.handleOnRightIconButtonClick }
                                color="inherit">
                                { this.renderIconElementRight() }
                            </IconButton>
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
                            <IconButton
                                className={classes.menuButton}
                                onClick={ this.handleOnRightIconButtonClick }
                                color="inherit">
                                { this.renderIconElementRight() }
                            </IconButton>
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

