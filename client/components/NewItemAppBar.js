import React from 'react';
import AppBar from 'material-ui/AppBar';

import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import * as helpers from "../helpers";

const NewItemAppBar = React.createClass({
    redirectHome() {
        this.props.history.push("/");
    },
    getSelectedItem() {
        const {
            targetArray,
            selectionValue
        } = helpers.getLocalProperties(this.props);
        const {
            index,
            selectedItem
        } = helpers.getSelectedItemAndIndexFromArray(
            targetArray,
            "code",
            selectionValue,
        );
        return selectedItem;
    },
    dispatchAction(props, actionName, ...args) {
        const localProps = helpers.getLocalProperties(props);
        props[actionName](localProps.type, localProps.selectionValue, ...args);
    },
    handleOnTitleClick(e) {
        helpers.dispatchAction(this.props, "beginEditItemTitle");
    },
    handleOnLeftIconButtonClick(e) {
        helpers.dispatchAction(this.props, "removeItem");
        this.redirectHome();
    },
    handleOnRightIconButtonClick(e) {
        helpers.dispatchAction(this.props, "addItem");
        this.redirectHome();
    },
    handleTitleOnChange(e, newValue) {
        return helpers.dispatchAction(this.props, "updateItemTitle", newValue);
    },
    renderTitle() {
        const {
            type,
            targetArray,
            selectionValue
        } = helpers.getLocalProperties(this.props);
        const selectedItem = this.getSelectedItem();
        const title = selectedItem.title || `New ${ type }`;
        if (selectedItem && selectedItem.isEditingTitle) {
            return (
                <TextField
                    id="text-field-default"
                    defaultValue={ title }
                    onChange={ (e, newValue) => this.handleTitleOnChange(e, newValue) }
                />
            )
        } else {
            return title;
        }
    },
    renderAppBar() {
        const selectedItem = this.getSelectedItem();
        if (selectedItem && selectedItem.isEditingTitle) {
            return (
                <AppBar
                    title={ this.renderTitle() }
                    iconElementLeft={ <IconButton><NavigationClose /></IconButton> }
                    onLeftIconButtonClick={ (e) => this.handleOnLeftIconButtonClick(e) }
                    iconElementRight={<FlatButton label="Save" />}
                    onRightIconButtonClick={ (e) => this.handleOnRightIconButtonClick(e) }
                />
            );
        } else {
            return (
                <AppBar
                    title={ this.renderTitle() }
                    onTitleClick={ (e) => this.handleOnTitleClick(e) }
                    iconElementLeft={ <IconButton><NavigationClose /></IconButton> }
                    onLeftIconButtonClick={ (e) => this.handleOnLeftIconButtonClick(e) }
                    iconElementRight={<FlatButton label="Save" />}
                    onRightIconButtonClick={ (e) => this.handleOnRightIconButtonClick(e) }
                />
            );
        }
    },
    render() {
        return this.renderAppBar();
    }
});

export default NewItemAppBar;
