import * as _ from "lodash";

const postSupervisor = (state = {}, action) => {
    const {
        sessionId,
        topicId,
    } = action;
    const sessionsForDeletion = state.toDelete || [];
    switch(action.type) {
        case "SELECT_SESSION_FOR_DELETION":
            return {
                ...state,
                toDelete: _.concat(sessionsForDeletion, [{ sessionId, topicId }]),
            };
        case "DESELECT_SESSION_FOR_DELETION":
            const index = _.findIndex(sessionsForDeletion, (item) => {
                return ((item.sessionId === sessionId) && (item.topicId === topicId));
            });
            const before = sessionsForDeletion.slice(0, index);   // before the one we are removing
            const after = sessionsForDeletion.slice(index + 1);   // after the one we are removing
            return {
                ...state,
                toDelete: [
                    ...before,
                    ...after,
                ],
            };
        default:
            return state;
    }
}

export default function supervisor(state = {}, action) {
    if (typeof action.topicId !== "undefined") {
        return postSupervisor(state, action);
    }
    switch(action.type) {
        case "SELECT_BOTTOM_NAV_INDEX":
            return {
                ...state,
                bottomNavSelectedIndex: action.index
            };
        case "DELETE_REQUESTED":
            return {
                ...state,
                deleteRequested: action.option
            };
        case "DISPLAY_SELECT_FOR_DELETION":
            return {
                ...state,
                displaySelectForDeletion: action.option
            };
        case "SELECT_ALL_FOR_DELETION":
            return {
                ...state,
                selectAllForDeletion: action.option
            };
        default:
            return state;
    }
    return state;
}
