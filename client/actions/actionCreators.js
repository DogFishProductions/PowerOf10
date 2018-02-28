export function updateItemDescription(type, itemId, newValue) {
    switch(type) {
        case "topic":
            return {
                type: "UPDATE_TOPIC",
                topicId: itemId,
                paramName: "description",
                newValue
            }
        case "session":
            return {
                type: "UPDATE_SESSION",
                sessionId: itemId,
                paramName: "description",
                newValue
            }
        default:
            return {}
    }
}

export function createItem(type, itemId) {
    switch(type) {
        case "topic":
            return {
                type: "CREATE_TOPIC",
                topicId: itemId
            }
        case "session":
            return {
                type: "CREATE_SESSION",
                sessionId: itemId
            }
        default:
            return {}
    }
}

export function updateItemTitle(type, itemId, newValue) {
    switch(type) {
        case "topic":
            return {
                type: "UPDATE_TOPIC",
                topicId: itemId,
                paramName: "title",
                newValue
            }
        case "session":
            return {
                type: "UPDATE_SESSION",
                sessionId: itemId,
                paramName: "title",
                newValue
            }
        default:
            return {}
    }
}

export function beginEditItemTitle(type, itemId) {
    switch(type) {
        case "topic":
            return {
                type: "BEGIN_EDIT_TOPIC_TITLE",
                topicId: itemId
            }
        case "session":
            return {
                type: "BEGIN_EDIT_SESSION_TITLE",
                sesionId: itemId
            }
        default:
            return {}
    }
}

export function endEditItemTitle(type, itemId) {
    switch(type) {
        case "topic":
            return {
                type: "END_EDIT_TOPIC_TITLE",
                topicId: itemId
            }
        case "session":
            return {
                type: "END_EDIT_SESSION_TITLE",
                sesionId: itemId
            }
        default:
            return {}
    }
}

export function addItem(type, itemId) {
    switch(type) {
        case "topic":
            return {
                type: "ADD_TOPIC",
                topicId: itemId
            }
        case "session":
            return {
                type: "ADD_SESSION",
                sessionId: itemId
            }
        default:
            return {}
    }
}

export function removeItem(type, itemId) {
    switch(type) {
        case "topic":
            return {
                type: "REMOVE_TOPIC",
                topicId: itemId
            }
        case "session":
            return {
                type: "REMOVE_SESSION",
                sessionId: itemId
            }
        default:
            return {}
    }
}

export function selectBottomNavIndex(index) {
    return {
        type: "SELECT_BOTTOM_NAV_INDEX",
        index
    }
}
