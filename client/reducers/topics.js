import * as _ from "lodash";

import { actionTypes } from "../constants";
import {
    getSelectedItemAndIndexFromArray,
    parseFirestoreTopics,
    firestoreMetaHasSessions,
    findFirestoreMetaSubCollection,
    excludedProperties,
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
        topicId,
        propName,
        newValue,
    } = action;
    const {
        index,
        selectedItem
    } = getSelectedItemAndIndexFromArray(state, "code", topicId);
    const before = state.slice(0, index);   // before the one we are updating
    const after = state.slice(index + 1);   // after the one we are updating
    switch(type) {
        case CREATE_TOPIC:
            return [
                ...state,
                {
                    code: topicId,
                    title: "New topic",
                    description: "",
                }
            ];
        case UPDATE_TOPIC:
            return [
                ...before,
                {
                    ...selectedItem,
                    ...{ [propName]: newValue },
                    requiresUpdate: true,
                },
                ...after
            ];
        case ADD_TOPIC:
            // booleans are only used to indicate active editing - false values do not need to be saved
            const updatedSelectedItem = _.pickBy(selectedItem, (prop) => (prop !== false));
            return [
                ...before,
                {
                    ...updatedSelectedItem,
                },
                ...after
            ];
        case REMOVE_TOPIC:
            return [
                ...before,
                ...after
            ];
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
        case "@@reduxFirestore/UPDATE_SUCCESS":
            if (!firestoreMetaHasSessions(meta)) {
                const topic = findFirestoreMetaSubCollection(action.meta, "topics");
                if (topic) {
                    const topicId = topic.doc;
                    if (topicId) {
                        const {
                            index,
                            selectedItem
                        } = getSelectedItemAndIndexFromArray(state, "code", topicId);
                        const before = state.slice(0, index);   // before the one we are updating
                        const after = state.slice(index + 1);   // after the one we are updating
                        return [
                            ...before,
                            _.omit(selectedItem, excludedProperties),
                            ...after,
                        ]
                    }
                }
            }
        default:
    }
    return state;
}

export default topics;
