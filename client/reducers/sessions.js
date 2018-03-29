import * as _ from "lodash";

import { actionTypes } from "../constants";
import {
    parseFirestoreSessions,
    findFirestoreMetaSubCollection,
    getSelectedItemAndBeforeAndAfterArraysFromState,
} from "../helpers";

const {
    CREATE_SESSION,
    UPDATE_SESSION,
    ADD_SESSION,
    REMOVE_SESSION,
    REMOVE_TOPIC,
} = actionTypes;

const postSession = (state = [], action) => {
    const {
        type,
        session,
        sessionId,
        propName,
        newValue,
    } = action;
    const {
        before,
        selectedItem,
        after,
    } = getSelectedItemAndBeforeAndAfterArraysFromState(state, sessionId);
    switch(type) {
        case CREATE_SESSION:
            const now = Date.now();
            return [
                ...state,
                session,
            ];
        case UPDATE_SESSION:
            if (selectedItem) {
                return [
                    ...before,
                    {
                        ...selectedItem,
                        ...{ [propName]: newValue },
                    },
                    ...after
                ];
            }
            return state;
        case ADD_SESSION:
            if (selectedItem) {
                return [
                    ...before,
                    _.pickBy(selectedItem, (prop) => (prop !== false)), // booleans are only used to indicate active editing - false values do not need to be saved
                    ...after
                ];
            }
            return state;
        case REMOVE_SESSION:
            if (selectedItem) {
                return [
                    ...before,
                    ...after
                ];
            }
            return state;
        default:
            return state;
    }
    return state;
}

const sessions = (state = [], action) => {
    const {
        type,
        sessionId,
        topicId,
        meta,
    } = action;
    if (typeof sessionId !== "undefined") {
        return {
          // take the current state
          ...state,
          // overwrite this topic with a new one
          [topicId]: postSession(state[topicId], action)
        }
    }
    switch(type) {
        case REMOVE_TOPIC:
            return {
                ...state,
                [topicId]: [],
            }
        case "@@reduxFirestore/GET_SUCCESS":
            const sessions = findFirestoreMetaSubCollection(action.meta, "sessions");
            if (sessions) {
                const {
                    topicId,
                    sessions,
                } = parseFirestoreSessions(action);
                return {
                    ...state,
                    [topicId]: sessions,
                }
            }
        // case "@@reduxFirestore/GET_REQUEST":
        // case "@@reduxFirestore/GET_FAILURE":
        default:
            return state;
    }
    return state;
}

export default sessions;
