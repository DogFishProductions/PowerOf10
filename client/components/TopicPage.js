import React from "react";
import * as _ from "lodash";

import TextField from 'material-ui/TextField';
import TimerIcon from 'material-ui-icons/Timer';
import TimerOffIcon from 'material-ui-icons/TimerOff';
import AddIcon from "material-ui-icons/Add";
import Button from 'material-ui/Button';

const fabStyle = {
    position: "absolute",
    top: "450px",
    left: "285px"
};
const timeSpentStyle = {
    position: "absolute",
    left: "-128px",
    margin: "8px 50%",
    width: "256px"
}

let calcCurrentDuration;

import { getBottomNavSelectedIndex, getSelectedItem, dispatchAction, durationToString, getTopicSessions, randomString } from "../helpers";
import ItemAppBar from "./ItemAppBar";
import ItemBottomNavigation from "./ItemBottomNavigation";
import SessionList from "./SessionList";
import TargetPage from "./TargetPage";
import NotesPage from "./NotesPage";

const TopicPage = React.createClass({
    componentWillUnmount() {
        clearInterval(calcCurrentDuration);
    },
    getSelectedTopic() {
        return getSelectedItem(this.props, "code") || { isNew: true };
    },
    getNewSessionId() {
        const sessionId = randomString(10, "aA#!");
        const { topicId } = this.props.params;
        // don't use handler dispatchAction as session id is not in URL yet
        this.props.createItem("session", sessionId, topicId);
        return {
            sessionId,
            topicId,
        };
    },
    getRunningSessionIndex() {
        const { topicId } = this.props.params;
        const sessions = this.props.sessions[topicId] || [];
        return _.findIndex(sessions, (s) => s.isRunning);
    },
    handleStartSessionOnClick(e) {
        const runningSessionIndex = this.getRunningSessionIndex();
        if (runningSessionIndex >= 0) {   
            const { topicId } = this.props.params;
            const runningSession = this.props.sessions[topicId][runningSessionIndex];
            // don't use handler dispatchAction as session id is not in URL
            this.props.updateItemProperty("session", runningSession.code, "isRunning", false, topicId);
            this.props.addItem("session", runningSession.code, topicId);
        } else {
            const {
                sessionId,
                topicId,
            } = this.getNewSessionId();
            // don't use handler dispatchAction as session id is not in URL
            this.props.updateItemProperty("session", sessionId, "isRunning", true, topicId);
            this.props.history.push(`/topic/${ topicId }/session/${ sessionId }`);
        }
    },
    handleAddSessionOnClick(e) {
        const {
            sessionId,
            topicId,
        } = this.getNewSessionId();
        this.props.history.push(`/topic/${ topicId }/session/${ sessionId }`);
    },
    handleDivOnClick(e) {
        dispatchAction(this.props, "updateItemProperty", "isEditingTitle", false);
    },
    renderDetailView() {
        const selectedIndex = getBottomNavSelectedIndex(this.props);
        const defaultSessionListText = this.getSelectedTopic().isNew ? "Save topic to start recording sessions" : "Start recording sessions";
        switch(selectedIndex) {
            case 0:
                const runningSessionIndex = this.getRunningSessionIndex();
                if (runningSessionIndex >= 0) {
                    return (
                        <div>
                            <TextField
                                label="Total Time Spent"
                                disabled={ true }
                                style={ timeSpentStyle }
                                value={ durationToString(getTopicSessions(this.props), "long") }
                            />
                            <SessionList { ...this.props } defaultText={ defaultSessionListText }/>
                        </div>
                    );
                }
                console.log(getTopicSessions(this.props))
                return (
                    <div>
                        <TextField
                            label="Total Time Spent"
                            disabled={ true }
                            style={ timeSpentStyle }
                            value={ durationToString(getTopicSessions(this.props), "humanized") }
                        />
                        <SessionList { ...this.props } defaultText={ defaultSessionListText }/>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <TargetPage { ...this.props }/>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <NotesPage { ...this.props }/>
                    </div>
                );
            default:
                return (
                    <div>
                        <SessionList { ...this.props } defaultText={ defaultSessionListText }/>
                    </div>
                );
        }
    },
    renderStartSessionIcon() {
        const runningSessionIndex = this.getRunningSessionIndex();
        if (runningSessionIndex >= 0) {
            if (!calcCurrentDuration) {    
                const { topicId } = this.props.params;
                const runningSession = this.props.sessions[topicId][runningSessionIndex];
                calcCurrentDuration = setInterval(
                    () => {
                        // don't use handler dispatchAction as session id is not in URL
                        this.props.updateItemProperty("session", runningSession.code, "to", Date.now(), topicId);
                    },
                    900,
                );
            }
            return (<TimerOffIcon />);
        }
        clearInterval(calcCurrentDuration);
        return (<TimerIcon />);
    },
    render() {
        return (
            <div className="pseudo-phone-main outer">
                <ItemAppBar { ...this.props } />
                <div className="pseudo-phone-list-no-scroll inner" onClick={ this.handleDivOnClick }>
                    { this.renderDetailView() }
                </div>
                <div className="inner">
                    <div className="floating-button-bottom-right">
                        <Button
                            variant="fab"
                            color="primary"
                            style={ { top: "-128px" } }
                            onClick={ this.handleAddSessionOnClick }>
                            <AddIcon />
                        </Button>
                    </div>
                    <div className="floating-button-bottom-right">
                        <Button
                            variant="fab"
                            color="primary"
                            style={ { top: "-56px" } }
                            onClick={ this.handleStartSessionOnClick }>
                            { this.renderStartSessionIcon() }
                        </Button>
                    </div>
                    <div className="bottom-nav" onClick={ this.handleDivOnClick }>
                        <ItemBottomNavigation { ...this.props } />
                    </div>
                </div>
            </div>
        )
    }
});

export default TopicPage;
