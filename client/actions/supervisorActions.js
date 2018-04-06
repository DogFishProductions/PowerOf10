import { actionTypes } from "../constants";

export const selectBottomNavIndex = (index) => {
    return {
        type: actionTypes.SELECT_BOTTOM_NAV_INDEX,
        index,
    }
}

export const deleteRequested = (option) => {
    return {
        type: actionTypes.DELETE_REQUESTED,
        option,
    }
}

export const displaySelectForDeletion = (option) => {
    return {
        type: actionTypes.DISPLAY_SELECT_FOR_DELETION,
        option,
    }
}

export const selectAllForDeletion = (type, items, topicId) => {
    switch(type) {
        case "topic":
            return {
                type: actionTypes.SELECT_ALL_TOPICS_FOR_DELETION,
                topics: items,
                topicId: "1", // return a dummy topic id
            }
        case "session":
            return {
                type: actionTypes.SELECT_ALL_SESSIONS_FOR_DELETION,
                sessions: items,
                topicId,
            }
        default:
            return {}
    }
}

export const deselectAllForDeletion = () => {
    return {
        type: actionTypes.DESELECT_ALL_FOR_DELETION,
    }
}

export const selectForDeletion = (type, itemId) => {
    switch(type) {
        case "topic":
            return {
                type: actionTypes.SELECT_TOPIC_FOR_DELETION,
                topicId: itemId,
            }
        case "session":
            return {
                type: actionTypes.SELECT_SESSION_FOR_DELETION,
                sessionId: itemId,
            }
        default:
            return {}
    }
}

export const deselectForDeletion = (type, itemId) => {
    switch(type) {
        case "topic":
            return {
                type: actionTypes.DESELECT_TOPIC_FOR_DELETION,
                topicId: itemId,
            }
        case "session":
            return {
                type: actionTypes.DESELECT_SESSION_FOR_DELETION,
                sessionId: itemId,
            }
        default:
            return {}
    }
}

export const openMenu = (option, anchor) => {
    return {
        type: actionTypes.OPEN_MENU,
        option,
        anchor,
    }
}

export const openDialog = (option) => {
    return {
        type: actionTypes.OPEN_DIALOG,
        option,
    }
}

export const sessionIsRunning = (option, topicId, sessionId) => {
    return {
        type: actionTypes.SESSION_IS_RUNNING,
        option,
        topicId,
        sessionId,
    }
}
