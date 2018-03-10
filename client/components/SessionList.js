import React from 'react';
import * as moment from 'moment';
import * as _ from "lodash";

import List, { ListItem, ListItemSecondaryAction, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import TimerIcon from 'material-ui-icons/Timer';
import TimerOffIcon from 'material-ui-icons/TimerOff';
import orange from 'material-ui/colors/orange';
import Slide from 'material-ui/transitions/Slide';

import {
    momentToDatetimeString, 
    durationToString,
    getTopicSessions,
    itemIsSelectedForDeletion,
} from "../helpers";

const defaultTextStyle = {
    marginLeft: "16px",
}

const styles = {
    icon: {
        fontSize: 25
    },
}

const compareSession = (a, b) => {
    if (a.from < b.from) {
        return 1;
    }
    if (a.from > b.from) {
        return -1;
    }
    return 0;
}

const SessionList = React.createClass({
    handlePrimaryOnClick(e, session) {
        this.props.history.push(`/topic/${this.props.params.topicId}/session/${session.code}`);
    },
    handleCheckboxOnClick(e) {
        const target = e.target;
        const type = "session";
        if (target.checked) {
            this.props.selectForDeletion(type, target.value);
        } else {
            this.props.deselectForDeletion(type, target.value);
        }
    },
    handleTimerOffButtonOnClick(e, sessionId) {
        const { topicId } = this.props.params;
        // don't use handler dispatchAction as session id is not in URL
        this.props.updateItemProperty("session", sessionId, "isRunning", false, topicId);
        // remove the unnecessary boolean property
        this.props.addItem("session", sessionId, topicId);
    },
    renderSessionDuration(session) {
        return (
            <span>{ durationToString([session], "humanized") }</span>
        );
    },
    renderTimerOffButton(sessionId) {
        return (
            <IconButton
                onClick={ (e) => this.handleTimerOffButtonOnClick(e, sessionId)}
            >
                <TimerOffIcon
                    style={ styles.icon }
                />
            </IconButton>
        )
    },
    renderTimerButton(enabled) {
        return (
            <IconButton
                disabled={ !enabled }
            >
                <TimerIcon
                    style={ styles.icon }
                />
            </IconButton>
        )
    },
    renderSession(session, i) {
        const { supervisor } = this.props;
        return (
            <div key={i}>
                <ListItem>
                    <Slide
                        direction="right"
                        in={ supervisor.displaySelectForDeletion }
                    >
                        <ListItemIcon>
                            <Checkbox
                                checked={ itemIsSelectedForDeletion(supervisor.toDelete, session.code) }
                                onChange={ this.handleCheckboxOnClick }
                                value={ session.code }
                            />
                        </ListItemIcon>
                    </Slide>
                    <ListItemText
                        onClick={ (e) => this.handlePrimaryOnClick(e, session) }
                        primary={ momentToDatetimeString(session, "from") }
                        secondary={ durationToString([session], "long") }
                    />
                    { session.isRunning && (
                        <ListItemSecondaryAction>
                            { this.renderTimerOffButton(session.code) }
                        </ListItemSecondaryAction>
                    ) }
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
                        subheader={ <ListSubheader style={ { backgroundColor: "#FF9800" } }>Sessions</ListSubheader> }
                    >
                        { currentSessions.sort(compareSession).map(this.renderSession)}
                    </List>
                </div>
            );
        } else {
            return (
                <List
                    subheader={ <ListSubheader style={ { backgroundColor: "#FF9800" } }>Sessions</ListSubheader> }
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