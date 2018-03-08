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
    console.log("removing item");
    console.log(type);
    console.log(itemId);
    console.log(topicId);
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

export function displaySelectForDeletion(option) {
    return {
        type: "DISPLAY_SELECT_FOR_DELETION",
        option
    }
}

export function selectAllForDeletion(option) {
    return {
        type: "SELECT_ALL_FOR_DELETION",
        option
    }
}

export function selectForDeletion(type, itemId, topicId) {
    switch(type) {
        case "topic":
            return {
                type: "SELECT_TOPIC_FOR_DELETION",
                topicId: itemId
            }
        case "session":
            console.log("selecting session for deletion");
            return {
                type: "SELECT_SESSION_FOR_DELETION",
                sessionId: itemId,
                topicId
            }
        default:
            return {}
    }
}

export function deselectForDeletion(type, itemId, topicId) {
    switch(type) {
        case "topic":
            return {
                type: "DESELECT_TOPIC_FOR_DELETION",
                topicId: itemId
            }
        case "session":
            return {
                type: "DESELECT_SESSION_FOR_DELETION",
                sessionId: itemId,
                topicId
            }
        default:
            return {}
    }
}
