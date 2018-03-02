import * as _ from "lodash";

import * as helpers from "../helpers";

const postTopic = (state = [], action) => {
    const {
        index,
        selectedItem
    } = helpers.getSelectedItemAndIndexFromArray(state, "code", action.topicId);
    const before = state.slice(0, index);   // before the one we are updating
    const after = state.slice(index + 1);   // after the one we are updating
    switch(action.type) {
        case "CREATE_TOPIC":
            return [
                ...state,
                {
                    code: action.topicId,
                    title: "New topic",
                    description: "",
                    isNew: true
                }
            ];
        case "UPDATE_TOPIC":
            const updatedValue = {};
            updatedValue[action.propName] = action.newValue;
            return [
                ...before,
                {
                    ...selectedItem,
                    ...updatedValue,
                },
                ...after
            ];
        case "ADD_TOPIC":
            // booleans are only used to indicate active editing - false values do not need to be saved
            const updatedSelectedItem = _.pickBy(selectedItem, (prop) => (prop !== false));
            return [
                ...before,
                {
                    ...updatedSelectedItem,
                },
                ...after
            ];
        case "REMOVE_TOPIC":
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
    return state;
}

export default topics;
