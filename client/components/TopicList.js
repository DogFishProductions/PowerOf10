import React from "react";
import { Router, Redirect } from "react-router";
import * as _ from "lodash";

import Avatar from "material-ui/Avatar";
import deepOrange from "material-ui/colors/deepOrange";
import red from "material-ui/colors/red";
import List, { ListItem, ListItemSecondaryAction, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";

import { IconTimerButton, IconTimerOffButton } from "./Buttons";
import { durationToString } from "../helpers";

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
                        { durationToString(this.props.sessions[topic.code], "stacked") }
                    </Avatar>
                    <ListItemText
                        primary={ topic.title }
                        secondary={ _.truncate(topic.description, { length: 100 }) }
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