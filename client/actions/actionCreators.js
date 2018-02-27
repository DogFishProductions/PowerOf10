export function createTopic(topicId) {
    return {
        type: "CREATE_TOPIC",
        topicId
    }
}

export function updateTopicDescription(topicId, newValue) {
    return {
        type: "UPDATE_TOPIC_DESCRIPTION",
        topicId,
        newValue
    }
}

export function addTopic(topicId) {
    return {
        type: "ADD_TOPIC",
        topicId
    }
}

export function removeTopic(topicId) {
    return {
        type: "REMOVE_TOPIC",
        topicId
    }
}

export function updateSessionDescription(sessionId, newValue) {
    return {
        type: "UPDATE_TOPIC_DESCRIPTION",
        sessionId,
        newValue
    }
}

export function addSession(sessionId) {
    return {
        type: "ADD_SESSION",
        sessionId
    }
}

export function removeSession(sessionId) {
    return {
        type: "REMOVE_SESSION",
        sessionId
    }
}

export function selectBottomNavIndex(index) {
    return {
        type: "SELECT_BOTTOM_NAV_INDEX",
        index
    }
}
