import React from "react";

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

import { getSelectedItem, dispatchAction } from "../helpers";

const notesStyle = {
    width: "328px",
    margin: "8px auto"
}

const NotesPage = React.createClass({
    handleOnChange(e) {
        dispatchAction(this.props, "updateItemProperty", "description", e.target.value);
    },
    getItemDescription() {
        const selectedItem = getSelectedItem(this.props, "code");
        return selectedItem.description;
    },
    render() {
        return (
            <div style={ notesStyle }>
                <TextField
                    style={ notesStyle }
                    placeholder="Describe your new topic"
                    label="Description"
                    multiline
                    rows="2"
                    rowsMax="15"
                    onChange={ this.handleOnChange }
                    value={ this.getItemDescription() }
                />
            </div>
        )
    }
});

export default NotesPage;
