import React from "react";

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

import { getSelectedItem, dispatchAction } from "../helpers";

const notesStyle = {
    width: "328px",
    margin: "8px auto"
}

export default class NotesPage extends React.Component {
    render() {
        const props = this.props;
        const handleOnChange = (e) => {
            dispatchAction(props, "updateItemProperty", "description", e.target.value);
        }
        const getItemDescription = () => {
            const selectedItem = getSelectedItem(props, "code");
            return selectedItem.description;
        }
        return (
            <div style={ notesStyle }>
                <TextField
                    style={ notesStyle }
                    placeholder={
                        this.props.params.sessionId
                        ? "Describe your session"
                        : "Describe your topic"
                    }
                    label="Description"
                    multiline
                    rows="2"
                    rowsMax="15"
                    onChange={ handleOnChange }
                    value={ getItemDescription() }
                />
            </div>
        )
    }
};
