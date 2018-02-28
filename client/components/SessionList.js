import React from 'react';
import * as moment from 'moment';

import { List, ListItem } from 'material-ui/List';
import { red500 } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import ImageTimer from 'material-ui/svg-icons/image/timer';
import ImageTimerOff from 'material-ui/svg-icons/image/timer-off';

const SessionList = React.createClass({
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
    renderSession(session, i) {
        return (
            <div key={i}>
                <ListItem
                    insetChildren={ true }
                    rightIconButton={ this.renderTimerButton(true) }
                    primaryText={ session.from }
                    secondaryText={ session.description }
                />
                <Divider />
            </div>
        )
    },
    renderListItems(defaultText = "Start recording sessions") {
        const sessions = this.props.sessions || [];
        const { topicId } = this.props.params;
        const currentSessions = sessions[topicId] || [];
        if (currentSessions.length > 0) {
            return (
                <List children={ currentSessions.map(this.renderSession)} />
            );
        } else {
            return (
                <h3>{ defaultText }</h3>
            );
        }
    },
    render() {
        return this.renderListItems(this.props.defaultText);
    }
});

export default SessionList;