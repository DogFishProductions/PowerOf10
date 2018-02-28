import * as moment from "moment";

const durationFromArrayOfSessions = (sessions = []) => {
    return sessions.reduce(
        (duration, session) => {
            const from = session.from || 0;
            const to = session.to || 0;
            return duration + (to - from);
        },
        0,
    );
}

export function durationToString(sessions = []) {
    const duration = moment.duration(durationFromArrayOfSessions(sessions), "milliseconds");
    return `${duration.hours()}h ${duration.minutes()}m`;
}

export function durationToStackedString(sessions = []) {
    const duration = moment.duration(durationFromArrayOfSessions(sessions), "milliseconds");
    return `${duration.hours()}h\r\n${duration.minutes()}m`;
}

export function randomString(length, chars) {
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

export function getBottomNavSelectedIndex(props) {
    return props.navigation.bottomNavSelectedIndex || 0;
}

export function getSelectedItemAndIndexFromArray(targetArray = [], paramName, selectionValue) {
    const index = targetArray.findIndex((item) => item[paramName] === selectionValue);
    const selectedItem = targetArray[index];
    return {
        index,
        selectedItem
    }
}

export function getSelectedItemPropertyFromArray(targetArray = [], paramName, selectionValue, property) {
    const { selectedItem } = this.getSelectedItemAndIndexFromArray(targetArray, paramName, selectionValue);
    return selectedItem ? selectedItem[property] : undefined;
}

export function getLocalProperties(props = {}) {
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
        localProps[type] = "session",
        localProps[targetArray] = props.sessions;
        localProps[selectionValue] = sessionId;
    }
    return localProps;
}

export function dispatchAction(props = {}, actionName, ...args) {
    const {
        type,
        selectionValue
    } = this.getLocalProperties(props);
    props[actionName](type, selectionValue, ...args);
}
