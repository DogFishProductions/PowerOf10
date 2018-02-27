export function addTopic(topicId) {
    return {
        type: "ADD_TOPIC",
        topicId
    }
}

export function removeTopic() {
    return {
        type: "REMOVE_TOPIC",
    }
}

export function addSession() {
    return {
        type: "ADD_SESSION",
    }
}

export function removeSession() {
    return {
        type: "REMOVE_SESSION",
    }
}

export function selectBottomNavIndex(index) {
    return {
        type: "SELECT_BOTTOM_NAV_INDEX",
        index
    }
}
