import React from "react";
import moment from "moment";

const durationFromArrayOfSessions = (sessions = []) => {
    return sessions.reduce(
        (duration, session) => {
            const from = session.from || 0;
            const to = session.to || Date.now();
            return duration + (to - from);
        },
        0,
    );
}

export const getTopicSessions = (props) => {
    const sessions = props.sessions || [];
    const { topicId } = props.params;
    return sessions[topicId] || [];
}

export const durationToString = (sessions = []) => {
    const duration = moment.duration(durationFromArrayOfSessions(sessions), "milliseconds");
    return `${duration.hours()}h ${duration.minutes()}m`;
}

export const durationToLongString = (sessions = []) => {
    const duration = moment.duration(durationFromArrayOfSessions(sessions), "milliseconds");
    return `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
}

export const durationToHumanizedString = (sessions = []) => {
    const duration = moment.duration(durationFromArrayOfSessions(sessions), "milliseconds");
    return (duration.milliseconds() === 0) ? "0h 0m" : duration.humanize();
}

export const durationToStackedString = (sessions = []) => {
    const duration = moment.duration(durationFromArrayOfSessions(sessions), "milliseconds");
    return (
        <span>
            { `${duration.hours()}h `}
            <br />
            { `${duration.minutes()}m` }
        </span>
    );
}

export const momentToDatetimeString = (session, prop) => {
    return moment(session[prop]).calendar(null, { sameElse: "dddd, MMMM Do YYYY, h:mm" });
}

export const momentToDateString = (session, prop) => {
    console.log(moment(session[prop]).format("YYYY-MM-DD"))
    return moment(session[prop]).format("YYYY-MM-DD");
}

export const momentToTimeString = (session, prop) => {
    return `${moment(session[prop]).format("HH:mm")}`;
}

export const randomString = (length, chars) => {
    var mask = "";
    if (chars.indexOf("a") > -1) mask += "abcdefghijklmnopqrstuvwxyz";
    if (chars.indexOf("A") > -1) mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (chars.indexOf("#") > -1) mask += "0123456789";
    if (chars.indexOf("!") > -1) mask += "_-";
    var result = "";
    for (var i = length; i > 0; --i) {
        result += mask[Math.floor(Math.random() * mask.length)];
    }
    return result;
}

export const getBottomNavSelectedIndex = (props) => {
    return props.navigation.bottomNavSelectedIndex || 0;
}

export const getSelectedItemAndIndexFromArray = (targetArray = [], paramName, selectionValue) => {
    const index = targetArray.findIndex((item) => item[paramName] === selectionValue);
    const selectedItem = targetArray[index];
    return {
        index,
        selectedItem
    }
}

export const getSelectedItemPropertyFromArray = (targetArray = [], paramName, selectionValue, property) => {
    const { selectedItem } = getSelectedItemAndIndexFromArray(targetArray, paramName, selectionValue);
    return selectedItem ? selectedItem[property] : undefined;
}

export const getLocalProperties = (props = {}) => {
    const {
        topicId,
        sessionId
    } = props.params;
    const localProps = {
        type: "topic",
        targetArray: props.topics,
        selectionValue: topicId
    };
    if (sessionId) {
        localProps["type"] = "session",
        localProps["targetArray"] = props.sessions[topicId];
        localProps["selectionValue"] = sessionId;
    }
    return localProps;
}

export const dispatchAction = (props = {}, actionName, ...args) => {
    const {
        type,
        selectionValue
    } = getLocalProperties(props);
    props[actionName](type, selectionValue, ...args);
}

export const getSelectedItem = (props, selectionProperty) => {
    const {
        targetArray,
        selectionValue
    } = getLocalProperties(props);
    const {
        index,
        selectedItem
    } = getSelectedItemAndIndexFromArray(
        targetArray,
        selectionProperty,
        selectionValue,
    );
    return selectedItem || { isNew: true };
}
