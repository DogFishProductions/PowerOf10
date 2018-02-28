import React from "react";

import TextField from 'material-ui/TextField';

import * as helpers from "../helpers";

const style = {
    width: "328px",
    margin: "0 auto"
}

const NotesPage = React.createClass({
    handleOnChange(e, newValue) {
        const localProps = helpers.getLocalProperties(this.props);
        return this.props.updateItemDescription(
            localProps.type,
            localProps.selectionValue,
            newValue,
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
            <div style={ style }>
                <TextField
                    hintText="Describe your new topic"
                    floatingLabelText="Description"
                    style={ style }
                    multiLine={ true }
                    rows={ 2 }
                    rowsMax={ 15 }
                    onChange={ (e, newValue) => this.handleOnChange(e, newValue) }
                    value={ this.getItemDescription() }
                />
            </div>
        )
    }
});

export default NotesPage;
