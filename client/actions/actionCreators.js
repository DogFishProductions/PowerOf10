export const updateItemProperty = (type, itemId, propName, newValue, topicId) => {
    switch(type) {
        case "topic":
            return {
                type: "UPDATE_TOPIC",
                topicId: itemId,
                propName,
                newValue
            }
        case "session":
            return {
                type: "UPDATE_SESSION",
                sessionId: itemId,
                topicId,
                propName,
                newValue
            }
        default:
            return {}
    }
}

export const createItem = (type, itemId, topicId) => {
    switch(type) {
        case "topic":
            return {
                type: "CREATE_TOPIC",
                topicId: itemId
            }
        case "session":
            return {
                type: "CREATE_SESSION",
                sessionId: itemId,
                topicId
            }
        default:
            return {}
    }
}

export const addItem = (type, itemId, topicId) => {
    switch(type) {
        case "topic":
            return {
                type: "ADD_TOPIC",
                topicId: itemId
            }
        case "session":
            return {
                type: "ADD_SESSION",
                sessionId: itemId,
                topicId
            }
        default:
            return {}
    }
}

export const removeItem = (type, itemId, topicId) => {
    switch(type) {
        case "topic":
            return {
                type: "REMOVE_TOPIC",
                topicId: itemId
            }
        case "session":
            return {
                type: "REMOVE_SESSION",
                sessionId: itemId,
                topicId,
            }
        default:
            return {}
    }
}

export const selectBottomNavIndex = (index) => {
    return {
        type: "SELECT_BOTTOM_NAV_INDEX",
        index,
    }
}

export const deleteRequested = (option) => {
    return {
        type: "DELETE_REQUESTED",
        option,
    }
}

export const displaySelectForDeletion = (option) => {
    return {
        type: "DISPLAY_SELECT_FOR_DELETION",
        option,
    }
}

export const selectAllForDeletion = (type, items, topicId) => {
    switch(type) {
        case "topic":
            return {
                type: "SELECT_ALL_TOPICS_FOR_DELETION",
                topics: items,
                topicId: "1", // return a dummy topic id
            }
        case "session":
            return {
                type: "SELECT_ALL_SESSIONS_FOR_DELETION",
                sessions: items,
                topicId,
            }
        default:
            return {}
    }
}

export const deselectAllForDeletion = () => {
    return {
        type: "DESELECT_ALL_FOR_DELETION",
    }
}

export const selectForDeletion = (type, itemId) => {
    switch(type) {
        case "topic":
            return {
                type: "SELECT_TOPIC_FOR_DELETION",
                topicId: itemId,
            }
        case "session":
            return {
                type: "SELECT_SESSION_FOR_DELETION",
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
                type: "DESELECT_TOPIC_FOR_DELETION",
                topicId: itemId,
            }
        case "session":
            return {
                type: "DESELECT_SESSION_FOR_DELETION",
                sessionId: itemId,
            }
        default:
            return {}
    }
}

export const editItemTitle = (option, topicId) => {
    return {
        type: "EDIT_ITEM_TITLE",
        option,
        topicId,
    }
}

export const openMenu = (option, anchor) => {
    return {
        type: "OPEN_MENU",
        option,
        anchor,
    }
}

export const openDialog = (option) => {
    return {
        type: "OPEN_DIALOG",
        option,
    }
}

export const sessionIsRunning = (option) => {
    return {
        type: "SESSION_IS_RUNNING",
        option,
    }
}