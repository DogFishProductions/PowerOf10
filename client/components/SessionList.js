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

import { IconTimerButton } from "./TimerButton";

import {
    momentToDatetimeString, 
    durationToString,
    getTopicSessions,
    itemIsSelectedForDeletion,
    handleDeleteItemCheckboxOnClick,
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
            router,
            sessions,
            topics,
            sessionIsRunning,
            updateItemProperty,
        } = props;
        const {
            uid,
            topicId,
        } = params;
        const handlePrimaryOnClick = (e, session) => {
            router.push(`/user/${ uid }/topic/${ topicId }/session/${ session.code }`);
        }
        const renderSessionDuration = (session) => {
            return (
                <span>{ durationToString([session], "humanized") }</span>
            );
        }
        const renderSession = (session, i) => {
            return (
                <div key={i}>
                    <ListItem
                        divider={ true }
                        dense={ true }
                        style={
                            _.get(supervisor, "isRunning.sessionId", -1) === _.get(session, "code", 0)
                            ? { backgroundColor: "#eee" }
                            : {}
                        }
                    >
                        <Slide
                            direction="right"
                            in={ supervisor.displaySelectForDeletion }
                            mountOnEnter
                            unmountOnExit={ true }
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={ itemIsSelectedForDeletion(supervisor.toDelete, session.code) }
                                    onChange={ (e) => handleDeleteItemCheckboxOnClick(e, props, "session") }
                                    value={ session.code }
                                />
                            </ListItemIcon>
                        </Slide>
                        <ListItemText
                            onClick={ (e) => handlePrimaryOnClick(e, session) }
                            primary={ momentToDatetimeString(session, "from") }
                            secondary={ durationToString([session], "long") }
                        />
                        { ((_.get(supervisor, "isRunning.sessionId", 0) === _.get(session, "code", 0)) ||
                            (session.to === session.from)) &&
                            <ListItemSecondaryAction>
                                <IconTimerButton { ...props } selectedSessionId={ session.code }/>
                            </ListItemSecondaryAction>
                        }
                    </ListItem>
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
