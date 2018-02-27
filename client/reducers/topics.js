function postTopics(state = [], action) {
    switch(action.type) {
        case "CREATE_TOPIC":
            return [
                ...state,
                {
                    code: action.topicId,
                    title: "New topic",
                    description: ""
                }
            ];
        case "UPDATE_TOPIC_DESCRIPTION":
            const i = state.findIndex((topic) => topic.code === action.topicId);
            const selectedTopic = state[i];
            return [
                ...state.slice(0, i),   // before the one we are updating
                { ...state[i], description: action.newValue },
                ...state.slice(i + 1),  // after the one we are updating
            ];
        case "ADD_TOPIC":
        case "REMOVE_TOPIC":
        default:
            return state;
    }
    return state;
}

export default function topics(state = [], action) {
    if (typeof action.topicId !== "undefined") {
        return postTopics(state, action);
    }
    return state;
}
