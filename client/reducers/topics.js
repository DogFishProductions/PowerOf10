function postTopics(state = [], action) {
    switch(action.type) {
        case 'ADD_TOPIC':
        case 'REMOVE_TOPIC':
        default:
            return state;
    }
    return state;
}

export default function topics(state = [], action) {
    if (typeof action.topicId !== 'undefined') {
        return {
            ...state,
            [action.topicId]: postTopics(state[action.topicId], action)
        }
    }
    return state;
}
