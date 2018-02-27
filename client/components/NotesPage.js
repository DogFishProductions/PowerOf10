import React from "react";

import TextField from 'material-ui/TextField';

const style = {
    width: "328px",
    margin: "0 auto"
}

const NotesPage = React.createClass({
    handleOnChange(e, newValue) {
        const {
            itemType
        } = this.props;
        const {
            topicId,
            itemId
        } = this.props.params;
        switch(itemType) {
            case "topic":
                return this.props.updateTopicDescription(topicId, newValue);
            case "session":
                return this.props.updateSessionDescription(sessionId, newValue);
            default:
                return;
        }
    },
    getItemDescription() {
        const {
            topicId,
            sessionId
        } = this.props.params;
        let i;
        let item = { description: "" };
        if (topicId) {
            i = this.props.topics.findIndex((topic) => topic.code === topicId);
            // get us the item
            item = this.props.topics[i];
        } else if (sessionId) {
            i = this.props.sessions.findIndex((session) => session.code === sessionId);
            // get us the item
            item = this.props.sessions[i];
        }
        return item.description;
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
