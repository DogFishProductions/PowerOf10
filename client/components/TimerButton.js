import React from "react";
import * as _ from "lodash";

import Button from 'material-ui/Button';
import IconButton from "material-ui/IconButton";
import TimerIcon from "material-ui-icons/Timer";
import TimerOffIcon from "material-ui-icons/TimerOff";
import FavoriteIcon from "material-ui-icons/Favorite";

import {
    getNewSession,
    getSelectedItemAndIndexFromArray,
} from "../helpers";

const styles = {
    icon: {
        fontSize: 25
    },
};

let calcCurrentDuration;
export const clearRunningUpdater = () => {
    clearInterval(calcCurrentDuration);
    calcCurrentDuration = null;
    heartbeatFlipFlop = false;
    count = 0;
    currentTo = null;
}

let heartbeatFlipFlop = false;
let count = 0;
let currentTo;
let isNew = false;

const handleStartSessionOnClick = (
    event,
    {
        updateSessionToFrom,
        createItem,
        supervisor,
        sessionIsRunning,
        topics,
        sessions,
        params,
        router,
        selectedTopicId,
        selectedSessionId,
    },
) => {
    const isRunning = supervisor.isRunning;
    const runningSessionId = isRunning.sessionId;
    const runningTopicId = isRunning.topicId;
    const {
        topicId = selectedTopicId,
        sessionId = selectedSessionId,
    } = params;
    const stopRunningSession = () => {
        const newTo = Date.now();
        updateSessionToFrom(runningSessionId, topicId, "to", newTo, (newTo - currentTo), false);
        sessionIsRunning(false);
        clearRunningUpdater();
    }
    if ((!sessionId && (runningTopicId === topicId)) || (runningSessionId === sessionId)) {
        stopRunningSession();
    } else {
        const {
            uid,
        } = params;
        // stop currently running session if one exists
        if (runningTopicId) {
            stopRunningSession();
        }
        // if we've got this far then the sessionId doesn't match the running sessionId which means
        // it is either a session we've created but not yet started or a new session
        let newSessionId = sessionId;
        let newSession;
        if (!newSessionId) {
            newSession = getNewSession({ params, createItem }, topicId);
            newSessionId = _.get(newSession, "code", -1);
        }
        // don't use handler dispatchAction as session id is not in URL
        sessionIsRunning(true, topicId, newSessionId);
        const topicSessions = sessions[topicId] || [];
        const runningSession = newSession || topicSessions.find((sess) => sess.code === newSessionId);
        const { selectedItem } = getSelectedItemAndIndexFromArray(topics, "code", topicId);
        currentTo = _.get(runningSession, "to", null);
        calcCurrentDuration = setInterval(
            () => {
                const newTo = Date.now();
                const oldTo = currentTo || newTo;   
                updateSessionToFrom(newSessionId, topicId, "to", newTo, (newTo - oldTo), isNew);
                if ((count % 4) === 0) {
                    heartbeatFlipFlop = !heartbeatFlipFlop;
                }
                currentTo = newTo;
                count++;
            },
            200,
        );
        if (supervisor.isNew) {
            router.push(`/user/${ uid }/topic/${ topicId }/session/${ newSessionId }`);
        }
    }
}

const renderTimerIcon = ({ params, supervisor, selectedTopicId, selectedSessionId }) => {
    isNew = (_.get(supervisor, "isNew.sessionId", -1) === _.get(supervisor, "isRunning.sessionId", -2));
    const {
        topicId = selectedTopicId,
        sessionId = selectedSessionId,
    } = params;
    return (_.get(supervisor, "isRunning.topicId", 0) === topicId &&
        ( !sessionId || _.get(supervisor, "isRunning.sessionId", 0) === sessionId))
    ? ( <TimerOffIcon
        style={ styles.icon }
    /> )
    : (<TimerIcon
        style={ styles.icon }
    />)
}

export const IconTimerButton = (props) =>
    <IconButton
        onClick={ (e) => handleStartSessionOnClick(e, props) }
    >
        { renderTimerIcon(props) }
    </IconButton>

export const FloatingTimerButton = (props) =>
    <Button
        disabled={ props.disabled }
        variant="fab"
        color="primary"
        style={ { top: "-56px" } }
        onClick={ (e) => handleStartSessionOnClick(e, props) }>
        { renderTimerIcon(props) }
    </Button>

export const TimerRunningIcon = (props) =>
    <FavoriteIcon
        style={ { margin: "0px 5px" } }
        color={ heartbeatFlipFlop ? "secondary" : "disabled" }
    />