import React from "react";
import * as _ from "lodash";

import TextField from 'material-ui/TextField';
import TimerIcon from 'material-ui-icons/Timer';
import TimerOffIcon from 'material-ui-icons/TimerOff';
import AddIcon from "material-ui-icons/Add";
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

const fabStyle = {
    position: "absolute",
    top: "450px",
    left: "285px"
};
const gridStyle = {
    flexGrow: "1",
    margin: "8px 16px 0px 16px",
    width: "328px",
}
const bottomGridStyle = {
    ...gridStyle,
    margin: "8px 0px 56px 0px",
    overflow: "auto",
    width: "360px",
    maxHeight: "416px"
}

let calcCurrentDuration;

import {
    getBottomNavSelectedIndex,
    getSelectedItem,
    dispatchAction,
    durationToString,
    getTopicSessions,
    randomString,
    getNewSessionId,
    getRunningSessionIndex,
    handleStartSessionOnClick,
} from "../helpers";
import ItemAppBar from "./ItemAppBar";
import ItemBottomNavigation from "./ItemBottomNavigation";
import SessionList from "./SessionList";
import TargetPage from "./TargetPage";
import NotesPage from "./NotesPage";

const TopicPage = React.createClass({
    componentWillUnmount() {
        clearInterval(calcCurrentDuration);
        calcCurrentDuration = null;
    },
    getSelectedTopic() {
        return getSelectedItem(this.props, "code") || { code: 0 };
    },
    handleAddSessionOnClick(e) {
        const props = this.props;
        const {
            sessionId,
            topicId,
        } = getNewSessionId(props);
        props.history.push(`/topic/${ topicId }/session/${ sessionId }`);
    },
    handleDivOnClick(e) {
        this.props.editItemTitle(false);
    },
    renderDetailView() {
        const selectedIndex = getBottomNavSelectedIndex(this.props);
        const defaultSessionListText = (this.props.supervisor.isNew === this.getSelectedTopic().code) ? "Save topic to start recording sessions" : "Start recording sessions";
        switch(selectedIndex) {
            case 0:
                return (
                    <div>
                        <Grid
                            container
                            spacing={ 24 }
                            style={ gridStyle }
                        >
                            <Grid item xs>
                                <TextField
                                    label="Total Time Spent"
                                    disabled={ true }
                                    fullWidth={ true }
                                    value={ durationToString(getTopicSessions(this.props), "long") }
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={ 24 }
                            style={ bottomGridStyle }
                        >
                            <Grid item xs>
                                <SessionList { ...this.props } defaultText={ defaultSessionListText }/>
                            </Grid>
                        </Grid>
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
        const runningSessionIndex = getRunningSessionIndex(this.props);
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
        calcCurrentDuration = null;
        return (<TimerIcon />);
    },
    render() {
        const props = this.props;
        return (
            <div className="pseudo-phone-main outer">
                <ItemAppBar { ...props } />
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
                            onClick={ (e) => handleStartSessionOnClick(e, props) }>
                            { this.renderStartSessionIcon() }
                        </Button>
                    </div>
                    <div className="bottom-nav" onClick={ this.handleDivOnClick }>
                        <ItemBottomNavigation { ...props } />
                    </div>
                </div>
            </div>
        )
    }
});

export default TopicPage;
