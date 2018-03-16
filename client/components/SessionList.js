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


export default class SessionList extends React.Component {
    render() {
        const props = this.props;
        const {
            supervisor,
            params,
            selectForDeletion,
            deselectForDeletion,
            router,
            updateItemProperty,
            addItem,
            sessions,
            topics,
        } = props;
        const {
            uid,
            topicId,
        } = params;
        const handlePrimaryOnClick = (e, session) => {
            router.push(`/user/${ uid }/topic/${ topicId }/session/${ session.code }`);
        }
        const handleCheckboxOnClick = (e) => {
            const target = e.target;
            const type = "session";
            if (target.checked) {
                selectForDeletion(type, target.value);
            } else {
                deselectForDeletion(type, target.value);
            }
        }
        const handleTimerOffButtonOnClick = (e, sessionId, i) => {
            // don't use handler dispatchAction as session id is not in URL
            updateItemProperty("session", sessionId, "isRunning", false, topicId);
        }
        const handleTimerButtonOnClick = (e, sessionId, i) => {
            const isRunning = supervisor.isRunning;
            updateItemProperty("session", isRunning.sessionId, "isRunning", false, isRunning.topicId);
            // don't use handler dispatchAction as session id is not in URL
            updateItemProperty("session", sessionId, "isRunning", true, topicId);
        }
        const renderSessionDuration = (session) => {
            return (
                <span>{ durationToString([session], "humanized") }</span>
            );
        }
        const renderTimerOffButton = (sessionId, i) => {
            return (
                <IconButton
                    onClick={ (e) => handleTimerOffButtonOnClick(e, sessionId, i)}
                >
                    <TimerOffIcon
                        style={ styles.icon }
                    />
                </IconButton>
            )
        }
        const renderTimerButton = (sessionId, i) => {
            return (
                <IconButton
                    onClick={ (e) => handleTimerButtonOnClick(e, sessionId, i)}
                >
                    <TimerIcon
                        style={ styles.icon }
                    />
                </IconButton>
            )
        }
        const renderSession = (session, i) => {
            return (
                <div key={i}>
                    <ListItem>
                        <Slide
                            direction="right"
                            in={ supervisor.displaySelectForDeletion }
                            mountOnEnter
                            unmountOnExit={ true }
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={ itemIsSelectedForDeletion(supervisor.toDelete, session.code) }
                                    onChange={ handleCheckboxOnClick }
                                    value={ session.code }
                                />
                            </ListItemIcon>
                        </Slide>
                        <ListItemText
                            onClick={ (e) => handlePrimaryOnClick(e, session) }
                            primary={ momentToDatetimeString(session, "from") }
                            secondary={ durationToString([session], "long") }
                        />
                        { session.isRunning && (
                            <ListItemSecondaryAction>
                                { renderTimerOffButton(session.code, i) }
                            </ListItemSecondaryAction>
                        ) }
                        { (session.to === session.from) &&
                            <ListItemSecondaryAction>
                                { renderTimerButton(session.code, i) }
                            </ListItemSecondaryAction>
                        }
                    </ListItem>
                    <Divider />
                </div>
            );
        }
        const renderListItems = (defaultText = "Start recording sessions") => {
            const currentSessions = getTopicSessions(props);
            if (currentSessions.length > 0) {
                return (
                    <div>
                        <List
                            subheader={ <ListSubheader style={ { backgroundColor: "#FF9800" } }>Sessions</ListSubheader> }
                        >
                            { currentSessions.sort(compareSession).map(renderSession)}
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
        }
        return renderListItems(props.defaultText);
    }
};
