import React from 'react';
import { Router, Redirect } from "react-router";

import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import { red500 } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import ImageTimer from 'material-ui/svg-icons/image/timer';
import ImageTimerOff from 'material-ui/svg-icons/image/timer-off';
import {
    deepOrange300,
    purple500,
} from 'material-ui/styles/colors';

import { durationToStackedString } from "../helpers";

const avatarStyle = {
    textAlign: "center",
    fontSize: 10
};


const TopicList = React.createClass({
    renderTimerOffButton() {
        return (
            <FlatButton
                icon={
                    <ImageTimerOff
                        color={ red500 }
                    />
                }
            />
        )
    },
    renderTimerButton(enabled) {
        return (
            <FlatButton
                icon={
                    <ImageTimer />
                }
                disabled={ !enabled }
            />
        )
    },
    renderTopic(topic, i) {
        return (
            <div key={i}>
                <ListItem
                    onClick={ () => { this.props.history.push(`/view/${topic.code}`) } }
                    insetChildren={ true }
                    rightIconButton={ this.renderTimerButton(true) }
                    primaryText={ topic.title }
                    secondaryText={ topic.description }
                    leftAvatar={
                        <Avatar
                            color={ deepOrange300 }
                            backgroundColor={ purple500 }
                            style={ avatarStyle }
                        >
                            { durationToStackedString(this.props.sessions[topic.code]) }
                        </Avatar>
                    }
                />
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