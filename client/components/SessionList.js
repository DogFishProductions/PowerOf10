import React from 'react';
import * as moment from 'moment';

import List, { ListItem, ListItemSecondaryAction, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

import { momentToDatetimeString, durationToString, getTopicSessions } from "../helpers";

const defaultTextStyle = {
    marginLeft: "16px",
}

const SessionList = React.createClass({
    handlePrimaryOnClick(e, session) {
        this.props.history.push(`/topic/${this.props.params.topicId}/session/${session.code}`);
    },
    handleCheckboxOnClick(e, checked) {
        // do something
    },
    renderSessionDuration(session) {
        return (
            <span>{ durationToString([session], "humanized") }</span>
        );
    },
    renderSession(session, i) {
        return (
            <div key={i}>
                <ListItem
                    onClick={ (e) => this.handlePrimaryOnClick(e, session) }
                >  
                    <Checkbox
                        onChange={ this.handleCheckboxOnClick }
                    />
                    <ListItemText
                        primary={ momentToDatetimeString(session, "from") }
                        secondary={ durationToString([session], "humanized") }
                    />
                </ListItem>
                <Divider />
            </div>
        );
    },
    renderListItems(defaultText = "Start recording sessions") {
        const currentSessions = getTopicSessions(this.props);
        if (currentSessions.length > 0) {
            return (
                <div>
                    <List
                        className="sessionList"
                        subheader={ <ListSubheader>Sessions</ListSubheader> }
                    >
                        { currentSessions.map(this.renderSession)}
                    </List>
                </div>
            );
        } else {
            return (
                <List
                    className="sessionList"
                    subheader={ <ListSubheader>Sessions</ListSubheader> }
                >
                    <span style={ defaultTextStyle }>{ defaultText }</span>
                </List>
            );
        }
    },
    render() {
        return this.renderListItems(this.props.defaultText);
    }
});

export default SessionList;