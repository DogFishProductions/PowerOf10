export function updateItemProperty(type, itemId, propName, newValue, topicId) {
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

export function createItem(type, itemId, topicId) {
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

export function addItem(type, itemId, topicId) {
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

export function removeItem(type, itemId, topicId) {
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
                topicId
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

export function deleteRequested(option) {
    return {
        type: "DELETE_REQUESTED",
        option
    }
}

export function selectForDeletion(option) {
    return {
        type: "SELECT_FOR_DELETION",
        option
    }
}
