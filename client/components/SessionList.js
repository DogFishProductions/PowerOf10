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

import { momentToDatetimeString, durationToString, getTopicSessions } from "../helpers";

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
    isSelectedForDeletion(session) {
        const { supervisor } = this.props;
        console.log(supervisor.toDelete);
        const index = _.findIndex(
            supervisor.toDelete,
            (sessionId) => {
                const result = (sessionId === session.code);
                return result;
            },
        );
        return (index >= 0);
    },
    handlePrimaryOnClick(e, session) {
        this.props.history.push(`/topic/${this.props.params.topicId}/session/${session.code}`);
    },
    handleCheckboxOnClick(e) {
        const target = e.target;
        if (target.checked) {
            this.props.selectForDeletion("session", target.value);
        } else {
            this.props.deselectForDeletion("session", target.value);
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
                                checked={ this.isSelectedForDeletion(session) }
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