import * as _ from "lodash";

import { actionTypes } from "../constants";
import {
    parseFirestoreTopics,
    firestoreMetaHasSessions,
    getSelectedItemAndBeforeAndAfterArraysFromState,
} from "../helpers";

const {
    CREATE_TOPIC,
    UPDATE_TOPIC,
    ADD_TOPIC,
    REMOVE_TOPIC,
} = actionTypes;

const postTopic = (state = [], action) => {
    const {
        type,
        topic,
        topicId,
        propName,
        newValue,
    } = action;
    const {
        before,
        selectedItem,
        after,
    } = getSelectedItemAndBeforeAndAfterArraysFromState(state, topicId);
    switch(type) {
        case CREATE_TOPIC:
            return [
                ...state,
                topic,
            ];
        case UPDATE_TOPIC:
            if (selectedItem) {
                return [
                    ...before,
                    {
                        ...selectedItem,
                        [propName]: newValue,
                    },
                    ...after
                ];
            }
            return state;
        case ADD_TOPIC:
            if (selectedItem) {
                return [
                    ...before,
                    _.pickBy(selectedItem, (prop) => (prop !== false)),
                    ...after
                ];
            }
            return state;
        case REMOVE_TOPIC:
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

const topics = (state = [], action) => {
    if (typeof action.topicId !== "undefined") {
        return postTopic(state, action);
    }
    const { meta } = action;
    switch (action.type) {
        case "@@reduxFirestore/GET_SUCCESS":
            if (!firestoreMetaHasSessions(meta)) {
                return [
                    ...parseFirestoreTopics(action),
                ];
            }
        // case "@@reduxFirestore/GET_REQUEST":
        // case "@@reduxFirestore/GET_FAILURE":
        default:
            return state;
    }
    return state;
}

export default topics;
