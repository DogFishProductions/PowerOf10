import * as helpers from "../helpers";

function postTopics(state = [], action) {
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
            updatedValue[action.paramName] = action.newValue;
            return [
                ...before,
                { ...selectedItem, ...updatedValue },
                ...after
            ];
        case "BEGIN_EDIT_TOPIC_TITLE":
            return [
                ...before,
                { ...selectedItem, isEditingTitle: true },
                ...after
            ];
        case "END_EDIT_TOPIC_TITLE":
            return [
                ...before,
                {
                    description: selectedItem.description,
                    title: selectedItem.title,
                    code: selectedItem.code,
                    isNew: selectedItem.isNew
                },
                ...after
            ];
        case "ADD_TOPIC":
            return [
                ...before,
                {
                    description: selectedItem.description,
                    title: selectedItem.title,
                    code: selectedItem.code
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

export default function topics(state = [], action) {
    if (typeof action.topicId !== "undefined") {
        return postTopics(state, action);
    }
    return state;
}
