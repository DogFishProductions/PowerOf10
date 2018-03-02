import React from "react";

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

import { getBottomNavSelectedIndex, getSelectedItem, dispatchAction, durationToHumanizedString, getTopicSessions, randomString } from "../helpers";
import ItemAppBar from "./ItemAppBar";
import ItemBottomNavigation from "./ItemBottomNavigation";
import SessionList from "./SessionList";
import TargetPage from "./TargetPage";
import NotesPage from "./NotesPage";

const TopicPage = React.createClass({
    getSelectedTopic() {
        return getSelectedItem(this.props, "code") || { isNew: true };
    },
    handleStartSessionOnClick(e) {
        const sessionId = randomString(10, "aA#!");
        const { topicId } = this.props.params;
        this.props.createItem("session", sessionId);
        this.props.history.push(`/topic/${ topicId }/session/${ sessionId }`);
    },
    handleAddSessionOnClick(e) {
        // do something
    },
    renderDetailView() {
        const selectedIndex = getBottomNavSelectedIndex(this.props);
        const defaultSessionListText = this.getSelectedTopic().isNew ? "Save topic to start recording sessions" : "Start recording sessions";
        switch(selectedIndex) {
            case 0:
                return (
                    <div>
                        <TextField
                            label="Total Time Spent"
                            disabled={ true }
                            style={ timeSpentStyle }
                            defaultValue={ durationToHumanizedString(getTopicSessions(this.props)) }
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
    handleDivOnClick(e) {
        dispatchAction(this.props, "updateItemProperty", "isEditingTitle", false);
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
                            <TimerIcon />
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
