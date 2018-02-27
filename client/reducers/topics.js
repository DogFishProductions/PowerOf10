function postTopics(state = [], action) {
    switch(action.type) {
        case 'ADD_TOPIC':
            return [
                ...state,
                {
                    code: action.topicId,
                    title: "",
                    description: ""
                }
            ];
        case 'REMOVE_TOPIC':
        default:
            return state;
    }
    return state;
}

export default function topics(state = [], action) {
    if (typeof action.topicId !== 'undefined') {
        return postTopics(state, action);
    }
    return state;
}
