import React from "react";
import { Router, Redirect } from "react-router";
import * as _ from "lodash";

import Avatar from "material-ui/Avatar";
import deepOrange from "material-ui/colors/deepOrange";
import red from "material-ui/colors/red";
import List, { ListItem, ListItemSecondaryAction, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import IconButton from 'material-ui/IconButton';
import TimerIcon from 'material-ui-icons/Timer';
import TimerOffIcon from 'material-ui-icons/TimerOff';
import Slide from 'material-ui/transitions/Slide';
import Checkbox from 'material-ui/Checkbox';

import {
    topicDurationToString,
    itemIsSelectedForDeletion,
    handleStartSessionOnClick,
    handleDeleteItemCheckboxOnClick,
} from "../helpers";

const styles = {
    orangeAvatar: {
        textAlign: "center",
        fontSize: 10,
        margin: 10,
        color: "#fff",
        backgroundColor: deepOrange[500],
    },
    icon: {
        fontSize: 25
    },
};

export default class TopicList extends React.Component {
    render() {
        const props = this.props;
        const {
            router,
            supervisor,
            topics,
            sessions,
            params,
        } = props;
        const {
            uid,
        } = params;
        const handlePrimaryOnClick = (e, topic) => {
            router.push(`/user/${ uid }/topic/${ topic.code }`);
        }
        const renderTimerButton = (topic) => {
            const topicId = topic.code;
            return (
                <IconButton
                    onClick={ (e) => handleStartSessionOnClick(e, props, topicId) }
                >
                    { (_.get(supervisor, "isRunning.topicId", 0) === topicId)
                    ? ( <TimerOffIcon
                        style={ styles.icon }
                    /> )
                    : (<TimerIcon
                        style={ styles.icon }
                    />)
                    }
                </IconButton>
            )
        }
        const renderTopic = (topic, i) => {
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
                                    checked={ itemIsSelectedForDeletion(supervisor.toDelete, topic.code) }
                                    onChange={ (e) => handleDeleteItemCheckboxOnClick(e, props, "topic") }
                                    value={ topic.code }
                                />
                            </ListItemIcon>
                        </Slide>
                        <Avatar
                            style={ styles.orangeAvatar }
                        >
                            { topicDurationToString(topic.duration, "stacked") }
                        </Avatar>
                        <ListItemText
                            onClick={ (e) => handlePrimaryOnClick(e, topic) }
                            primary={ topic.title }
                            secondary={ _.truncate(topic.description, { length: 100 }) }
                        />
                        <ListItemSecondaryAction>
                            { renderTimerButton(topic) }
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                </div>
            )
        }
        return (
            <List children={ topics.map(renderTopic) } />
        )
    }
};
