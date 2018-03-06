import * as _ from "lodash";

import * as helpers from "../helpers";

const postSession = (state = [], action) => {
    const {
        index,
        selectedItem
    } = helpers.getSelectedItemAndIndexFromArray(state, "code", action.sessionId);
    const before = state.slice(0, index);   // before the one we are updating
    const after = state.slice(index + 1);   // after the one we are updating
    switch(action.type) {
        case "CREATE_SESSION":
            const now = Date.now();
            return [
                ...state,
                {
                    code: action.sessionId,
                    description: "",
                    from: now,
                    to: now,
                    isNew: true
                }
            ];
        case "UPDATE_SESSION":
            const updatedValue = {};
            updatedValue[action.propName] = action.newValue;
            return [
                ...before,
                {
                    ...selectedItem,
                    ...updatedValue
                },
                ...after
            ];
        case "ADD_SESSION":
            // booleans are only used to indicate active editing - false values do not need to be saved
            const updatedSelectedItem = _.pickBy(selectedItem, (prop) => (prop !== false));
            return [
                ...before,
                {
                    ...updatedSelectedItem,
                },
                ...after
            ];
        case "REMOVE_SESSION":
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
    if (typeof action.sessionId !== "undefined") {
        return {
          // take the current state
          ...state,
          // overwrite this topic with a new one
          [action.topicId]: postSession(state[action.topicId], action)
        }
    }
    return state;
}

export default sessions;
