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
    randomString,
    durationToString,
    itemIsSelectedForDeletion,
    getNewSessionId,
    getRunningSessionIndex,
    handleStartSessionOnClick,
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

const TopicList = React.createClass({
    handlePrimaryOnClick(e, topic) {
        this.props.history.push(`/topic/${topic.code}`);
    },
    handleCheckboxOnClick(e) {
        const target = e.target;
        const type = "topic";
        if (target.checked) {
            this.props.selectForDeletion(type, target.value);
        } else {
            this.props.deselectForDeletion(type, target.value);
        }
    },
    renderTimerButton(topic) {
        const props = this.props;
        const runningSessionIndex = getRunningSessionIndex(props, topic.code);
        return (
            <IconButton
                onClick={ (e) => handleStartSessionOnClick(e, props, topic.code) }
            >
                { (runningSessionIndex >= 0) ?
                    ( <TimerOffIcon
                        style={ styles.icon }
                    /> ) :
                    (<TimerIcon
                        style={ styles.icon }
                    />)
                }
            </IconButton>
        )
    },
    renderTopic(topic, i) {
        const { supervisor } = this.props;
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
                                onChange={ this.handleCheckboxOnClick }
                                value={ topic.code }
                            />
                        </ListItemIcon>
                    </Slide>
                    <Avatar
                        style={ styles.orangeAvatar }
                    >
                        { durationToString(this.props.sessions[topic.code], "stacked") }
                    </Avatar>
                    <ListItemText
                        onClick={ (e) => this.handlePrimaryOnClick(e, topic) }
                        primary={ topic.title }
                        secondary={ _.truncate(topic.description, { length: 100 }) }
                    />
                    <ListItemSecondaryAction>
                        { this.renderTimerButton(topic) }
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
            </div>
        )
    },
    render() {
        return (
            <List children={ this.props.topics.map(this.renderTopic)} />
        )
    }
});

export default TopicList;