import { actionTypes } from "../constants";

export const updateItemProperty = (type, itemId, propName, newValue, topicId) => {
    switch(type) {
        case "topic":
            return {
                type: actionTypes.UPDATE_TOPIC,
                topicId: itemId,
                propName,
                newValue
            }
        case "session":
            return {
                type: actionTypes.UPDATE_SESSION,
                sessionId: itemId,
                topicId,
                propName,
                newValue
            }
        default:
            return {}
    }
}

export const createItem = (type, item, itemId, topicId) => {
    switch(type) {
        case "topic":
            return {
                type: actionTypes.CREATE_TOPIC,
                topic: item,
                topicId: itemId
            }
        case "session":
            return {
                type: actionTypes.CREATE_SESSION,
                session: item,
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
                type: actionTypes.ADD_TOPIC,
                topicId: itemId
            }
        case "session":
            return {
                type: actionTypes.ADD_SESSION,
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
                type: actionTypes.REMOVE_TOPIC,
                topicId: itemId
            }
        case "session":
            return {
                type: actionTypes.REMOVE_SESSION,
                sessionId: itemId,
                topicId,
            }
        default:
            return {}
    }
}

export const editItemTitle = (option, topicId) => {
    return {
        type: actionTypes.EDIT_ITEM_TITLE,
        option,
        topicId,
    }
}
