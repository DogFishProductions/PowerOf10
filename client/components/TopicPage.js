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
const clearRunningUpdater = () => {
    clearInterval(calcCurrentDuration);
    calcCurrentDuration = null;
}

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

export default class TopicPage extends React.Component {
    componentWillUnmount() {
        clearRunningUpdater();
    }
    componentWillReceiveProps(nextProps)  {
        const runningSessionId = _.get(this, "props.supervisor.isRunning.sessionId", null);
        const newRunningSessionId = _.get(nextProps, "supervisor.isRunning.sessionId", null)
        if (runningSessionId && (runningSessionId != newRunningSessionId)) {
            clearRunningUpdater();
        }
    }
    render() {
        const props = this.props;
        const {
            supervisor,
            router,
            editItemTitle,
            params,
            selectBottomNavIndex,
        } = props;
        const {
            uid,
        } = params;
        const getSelectedTopic = () => {
            return getSelectedItem(props, "code") || { code: 0 };
        }
        const handleAddSessionOnClick = (e) => {
            const {
                sessionId,
                topicId,
            } = getNewSessionId(props);
            selectBottomNavIndex(0);
            router.push(`/user/${ uid }/topic/${ topicId }/session/${ sessionId }`);
        }
        const handleDivOnClick = (e) => {
            editItemTitle(false);
        }
        const renderDetailView = () => {
            const selectedIndex = getBottomNavSelectedIndex(props);
            const defaultSessionListText = (supervisor.isNew === getSelectedTopic().code) ? "Save topic to start recording sessions" : "Start recording sessions";
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
                                        value={ durationToString(getTopicSessions(props), "long") }
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                spacing={ 24 }
                                style={ bottomGridStyle }
                            >
                                <Grid item xs>
                                    <SessionList { ...props } defaultText={ defaultSessionListText }/>
                                </Grid>
                            </Grid>
                        </div>
                    );
                case 1:
                    return (
                        <div>
                            <TargetPage { ...props }/>
                        </div>
                    );
                case 2:
                    return (
                        <div>
                            <NotesPage { ...props }/>
                        </div>
                    );
                default:
                    return (
                        <div>
                            <SessionList { ...props } defaultText={ defaultSessionListText }/>
                        </div>
                    );
            }
        }
        const renderStartSessionIcon = () => {
            const runningSessionIndex = getRunningSessionIndex(props);
            if (runningSessionIndex >= 0) {
                if (!calcCurrentDuration) {    
                    const { topicId } = props.params;
                    const runningSession = props.sessions[topicId][runningSessionIndex];
                    calcCurrentDuration = setInterval(
                        () => {
                            // don't use handler dispatchAction as session id is not in URL
                            props.updateItemProperty("session", runningSession.code, "to", Date.now(), topicId);
                        },
                        900,
                    );
                }
                return (<TimerOffIcon />);
            }
            clearInterval(calcCurrentDuration);
            calcCurrentDuration = null;
            return (<TimerIcon />);
        }
        return (
            <div className="pseudo-phone-main outer">
                <ItemAppBar { ...props } />
                <div className="pseudo-phone-list-no-scroll inner" onClick={ handleDivOnClick }>
                    { renderDetailView() }
                </div>
                <div className="inner">
                    <div className="floating-button-bottom-right">
                        <Button
                            variant="fab"
                            color="primary"
                            style={ { top: "-128px" } }
                            onClick={ handleAddSessionOnClick }>
                            <AddIcon />
                        </Button>
                    </div>
                    <div className="floating-button-bottom-right">
                        <Button
                            variant="fab"
                            color="primary"
                            style={ { top: "-56px" } }
                            onClick={ (e) => handleStartSessionOnClick(e, props) }>
                            { renderStartSessionIcon() }
                        </Button>
                    </div>
                    <div className="bottom-nav" onClick={ handleDivOnClick }>
                        <ItemBottomNavigation { ...props } />
                    </div>
                </div>
            </div>
        )
    }
};
