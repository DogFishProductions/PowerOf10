import React from "react";
import { Router, Redirect } from "react-router";

import Avatar from "material-ui/Avatar";
import deepOrange from "material-ui/colors/deepOrange";
import red from "material-ui/colors/red";
import List, { ListItem, ListItemSecondaryAction, ListItemIcon, ListItemText } from 'material-ui/List';

import IconButton from 'material-ui/IconButton';
import TimerIcon from 'material-ui-icons/Timer';

import Divider from "material-ui/Divider";

import { IconTimerButton, IconTimerOffButton } from "./Buttons";
import { durationToStackedString } from "../helpers";

const styles = {
    orangeAvatar: {
        textAlign: "center",
        fontSize: 10,
        margin: 10,
        color: "#fff",
        backgroundColor: deepOrange[500],
    },
    iconButton: {
        fontSize: 20,
    },
};

const TopicList = React.createClass({
    handlePrimaryOnClick(e, topic) {
        this.props.history.push(`/topic/${topic.code}`);
    },
    renderTimerOffButton() {
        return (
            <IconTimerOffButton />
        )
    },
    renderTimerButton(enabled) {
        return (
            <IconTimerButton disabled={ !enabled } />
        )
    },
    renderTopic(topic, i) {
        return (
            <div key={i}>
                <ListItem
                    onClick={ (e) => this.handlePrimaryOnClick(e, topic) }
                >
                    <Avatar
                        style={ styles.orangeAvatar }
                    >
                        { durationToStackedString(this.props.sessions[topic.code]) }
                    </Avatar>
                    <ListItemText
                        primary={ topic.title }
                        secondary={ topic.description }
                    />
                    <ListItemSecondaryAction>
                        { this.renderTimerButton(true) }
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