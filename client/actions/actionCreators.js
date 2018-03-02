export function updateItemProperty(type, itemId, propName, newValue) {
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
                propName,
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
