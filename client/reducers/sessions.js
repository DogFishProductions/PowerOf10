import * as _ from "lodash";

import { actionTypes } from "../constants";
import { getSelectedItemAndIndexFromArray } from "../helpers";

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
        sessionId,
        propName,
        newValue,
    } = action;
    const {
        index,
        selectedItem
    } = getSelectedItemAndIndexFromArray(state, "code", sessionId);
    const before = state.slice(0, index);   // before the one we are updating
    const after = state.slice(index + 1);   // after the one we are updating
    switch(type) {
        case CREATE_SESSION:
            const now = Date.now();
            return [
                ...state,
                {
                    code: sessionId,
                    description: "",
                    from: now,
                    to: now
                }
            ];
        case UPDATE_SESSION:
            const updatedSelectedItem = {
                ...selectedItem,
                ...{ [propName]: newValue },
            }
            // booleans are only used to indicate active editing - false values do not need to be saved
            const filteredSelectedItem = _.pickBy(updatedSelectedItem, (prop) => (prop !== false));
            return [
                ...before,
                filteredSelectedItem,
                ...after
            ];
        case ADD_SESSION:
            return [
                ...before,
                selectedItem,
                ...after
            ];
        case REMOVE_SESSION:
            return [
                ...before,
                ...after
            ];
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
        default:
            return state;
    }
    return state;
}

export default sessions;
