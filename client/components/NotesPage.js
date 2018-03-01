import React from "react";

import TextField from 'material-ui/TextField';

import * as helpers from "../helpers";

const notesStyle = {
    width: "328px",
    margin: "0 auto"
}

const NotesPage = React.createClass({
    handleOnChange(e) {
        const localProps = helpers.getLocalProperties(this.props);
        return this.props.updateItemDescription(
            localProps.type,
            localProps.selectionValue,
            e.target.value,
        );
    },
    getItemDescription() {
        const localProps = helpers.getLocalProperties(this.props);
        return helpers.getSelectedItemPropertyFromArray(
            localProps.targetArray,
            "code",
            localProps.selectionValue,
            "description",
        );
    },
    render() {
        return (
            <div style={ notesStyle }>
                <TextField
                    placeholder="Describe your new topic"
                    label="Description"
                    style={ notesStyle }
                    multiLine
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
