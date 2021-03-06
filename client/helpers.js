import React from "react";
import moment from "moment";
import LoadingIndicator from "./components/LoadingIndicator";

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

export const getTopicSessions = (props) => {
    const sessions = props.sessions || [];
    const { topicId } = props.params;
    return sessions[topicId] || [];
}

export const durationToString = (sessions = [], type) => {
    const duration = moment.duration(durationFromArrayOfSessions(sessions), "milliseconds");
    return durationToStringType(duration, type);
}

const durationToStringType = (duration, type) => {
    const hours = Math.trunc(duration.asHours());
    const mins = duration.minutes();
    const secs = duration.seconds();
    switch(type) {
        case "long":
            return `${hours}h ${mins}m ${secs}s`;
        case "humanized":
            return (duration.asMilliseconds() < 400) ? "0h 0m" : duration.humanize();
        case "stacked":
            return (
                <span>
                    { `${hours}h `}
                    <br />
                    { `${mins}m` }
                </span>
            );
        default:
            return `${duration.hours()}h ${duration.minutes()}m`;
    }
}

export const topicDurationToString = (duration = 0, type) => {
    const dur = moment.duration(duration || 0, "milliseconds");
    return durationToStringType(dur, type);
}

export const momentToDatetimeString = (session, prop) => {
    return moment(session[prop]).calendar(null, { sameElse: "dddd, MMMM Do YYYY, h:mm" });
}

export const momentToDateString = (session, prop) => {
    return moment(session[prop]).format("YYYY-MM-DD");
}

export const momentToTimeString = (session, prop) => {
    return `${moment(session[prop]).format("HH:mm")}`;
}

export const momentIsInThePast = (dateTimeString) => {
    return (moment() - moment(dateTimeString, "YYYY-MM-DD, HH:mm")) >= 0.0;
}

export const momentFromIsBeforeTo = (fromDateTimeString, toDateTimeString) => {
    return (moment(toDateTimeString, "YYYY-MM-DD, HH:mm") - moment(fromDateTimeString, "YYYY-MM-DD, HH:mm")) >= 0.0;
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
    return props.supervisor.bottomNavSelectedIndex || 0;
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
        localProps["topicId"] = topicId;
    }
    return localProps;
}

export const dispatchAction = (props = {}, actionName, ...args) => {
    const {
        type,
        selectionValue,
        topicId
    } = getLocalProperties(props);
    props[actionName](type, selectionValue, ...[...args, topicId]);
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
    return selectedItem || { };
}

export const selectedItemIsNew = (props, selectionProperty) => {
    const selectedItem = getSelectedItem(props, selectionProperty);
    const {
        sessionId,
        topicId,
    } = props.supervisor.isNew;
    return ((selectedItem[selectionProperty] === sessionId) || (selectedItem[selectionProperty] === topicId));
}

export const itemIsSelectedForDeletion = (items, itemId) => {
    const index = _.findIndex(
        items,
        (currentItemId) => {
            return (currentItemId === itemId);
        },
    );
    return (index >= 0);
}

export const getNewSession = ({ params, createItem }, topicId) => {
    const sessionId = randomString(20, "aA#");
    topicId = params.topicId || topicId;
    const start = Date.now();
    // don't use handler dispatchAction as session id is not in URL yet
    const newSession = {
        code: sessionId,
        description: "",
        from: start,
        to: start
    }
    createItem("session", newSession, sessionId, topicId);
    return newSession;
}

const parseFirestoreData = (payload) => {
    return _.transform(
        _.get(payload, "data", {}),
        (result, value, key) => {
            result.push(_.assign(_.omit(value, ["sessions"]), { code: key }));
        },
        []
    );
}

export const parseFirestoreTopics = ({ payload }) => {
    return parseFirestoreData(payload);
}

export const parseFirestoreSessions = ({ payload, meta }) => {
    const subcollections = _.get(meta, "subcollections", []);
    const topic = subcollections.find((sColl) => _.get(sColl, "collection") === "topics");
    return {
        topicId: _.get(topic, "doc", "unknown"),
        sessions: parseFirestoreData(payload),
    };
}

export const createFirestoreQueryPath = (userId, topics = false, topicId, sessions = false, sessionId) => {
    const query = {
        collection: "users",
        doc: userId,
        subcollections: [],
    }
    if (topics || topicId) {
        const tsc = { collection: "topics" };
        if (topicId) {
            tsc.doc = topicId; 
        }
        query.subcollections.push(tsc);
    }
    if (sessions || sessionId) {
        const ssc = { collection: "sessions" };
        if (sessionId) {
            ssc.doc = sessionId; 
        }
        query.subcollections.push(ssc);
    }
    return query;
}

export const findFirestoreMetaSubCollection = (meta, scName) => {
    return _.get(meta, "subcollections", []).find((item) => _.get(item, "collection") === scName);
}

export const firestoreMetaHasSessions = (meta) => {
    return _.get(meta, "subcollections", []).find((item) => _.get(item, "collection") === "sessions") != undefined;
}

export const handleDeleteItemCheckboxOnClick = (e, { selectForDeletion, deselectForDeletion }, type) => {
    const target = e.target;
    if (target.checked) {
        selectForDeletion(type, target.value);
    } else {
        deselectForDeletion(type, target.value);
    }
}

export const getSelectedItemAndBeforeAndAfterArraysFromState = (state, itemId) => {
    const {
        index,
        selectedItem
    } = getSelectedItemAndIndexFromArray(state, "code", itemId);
    const before = state.slice(0, index);   // before the one we are updating
    const after = state.slice(index + 1);   // after the one we are updating
    return {
        before,
        selectedItem,
        after,
    }
}

export const withLoadingIndicator = (Component) => {
    return ({ isLoading, loadingMessage, ...props })  => {
        if (!isLoading) {
            return <Component { ...props } />;
        }
        return <LoadingIndicator  loadingMessage={ loadingMessage } />
    }
}
