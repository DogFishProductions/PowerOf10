import * as _ from "lodash";

const postSupervisor = (state = {}, action) => {
    const {
        topicId,
        sessionId,
    } = action;
    const sessionsForDeletion = state.toDelete || [];
    switch(action.type) {
        case "SELECT_SESSION_FOR_DELETION":
            return {
                ...state,
                toDelete: _.uniq(_.concat(sessionsForDeletion, [action.sessionId])),
            };
        case "DESELECT_SESSION_FOR_DELETION":
            const index = _.findIndex(sessionsForDeletion, (item) => {
                return (item === sessionId);
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
        case "SELECT_ALL_SESSIONS_FOR_DELETION":
            const selectedSessions = action.sessions[action.topicId];
            return {
                ...state,
                selectAllForDeletion: true,
                toDelete: _.uniq(_.concat(sessionsForDeletion, selectedSessions.map((session) => session.code))),
            };
        case "CREATE_TOPIC":
            return {
                ...state,
                isNew: { topicId, sessionId: state.isNew.sessionId },
            };
        case "CREATE_SESSION":
            return {
                ...state,
                isNew: { topicId: state.isNew.topicId, sessionId },
            };
        default:
            return state;
    }
}

const supervisor = (state = {}, action) => {
    if ((typeof action.topicId !== "undefined") || (typeof action.sessionId !== "undefined")) {
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
        case "DESELECT_ALL_FOR_DELETION":
            return {
                ...state,
                selectAllForDeletion: false,
                toDelete: [],
            };
        case "ADD_TOPIC":
            return {
                ...state,
                isNew: { topicId: null, sessionId: state.isNew.sessionId },
            };
        case "ADD_SESSION":
            return {
                ...state,
                isNew: { topicId: state.isNew.topicId, sessionId: null },
            };
        default:
            return state;
    }
    return state;
}

export default supervisor;
