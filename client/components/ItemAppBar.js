import React from 'react';
import AppBar from 'material-ui/AppBar';

import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { dispatchAction, getSelectedItem, getLocalProperties } from "../helpers";

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
        }
        this.redirectHome();
    },
    handleOnRightIconButtonClick(e) {
        dispatchAction(this.props, "addItem");
        this.redirectHome();
    },
    handleTitleOnChange(e, newValue) {
        return dispatchAction(this.props, "updateItemTitle", newValue);
    },
    renderTitle() {
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
                        id="text-field-default"
                        hintText={ title }
                        onChange={ (e, newValue) => this.handleTitleOnChange(e, newValue) }
                    />
                )
            } else {
                return (
                    <TextField
                        id="text-field-default"
                        defaultValue={ title }
                        onChange={ (e, newValue) => this.handleTitleOnChange(e, newValue) }
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
                <IconButton><NavigationClose /></IconButton>
            );
        } else {
            return (
                <IconButton><NavigationArrowBack /></IconButton>
            );
        }
    },
    renderIconElementRight() {
        const selectedItem = getSelectedItem(this.props, "code");
        if (selectedItem.isNew) {
            return (
                <FlatButton label="Save" />
            );
        } else {
            return (
                <IconButton><NavigationMoreVert /></IconButton>
            );
        }
    },
    renderAppBar() {
        const selectedItem = getSelectedItem(this.props, "code");
        if (selectedItem.isEditingTitle) {
            return (
                <AppBar
                    title={ this.renderTitle() }
                    iconElementLeft={ this.renderIconElementLeft() }
                    onLeftIconButtonClick={ (e) => this.handleOnLeftIconButtonClick(e) }
                    iconElementRight={ this.renderIconElementRight() }
                    onRightIconButtonClick={ (e) => this.handleOnRightIconButtonClick(e) }
                />
            );
        } else {
            return (
                <AppBar
                    title={ this.renderTitle() }
                    onTitleClick={ (e) => this.handleOnTitleClick(e) }
                    iconElementLeft={ this.renderIconElementLeft() }
                    onLeftIconButtonClick={ (e) => this.handleOnLeftIconButtonClick(e) }
                    iconElementRight={ this.renderIconElementRight() }
                    onRightIconButtonClick={ (e) => this.handleOnRightIconButtonClick(e) }
                />
            );
        }
    },
    render() {
        return this.renderAppBar();
    }
});

export default ItemAppBar;
