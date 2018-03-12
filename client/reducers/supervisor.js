import * as _ from "lodash";

const postSupervisor = (state = {}, action) => {
    const {
        topicId,
        sessionId,
    } = action;
    const itemsForDeletion = state.toDelete || [];
    let index, before, after;
    let itemId, selectedItems;
    switch(action.type) {
        case "SELECT_SESSION_FOR_DELETION":
            itemId = action.sessionId;
        case "SELECT_TOPIC_FOR_DELETION":
            itemId = itemId || action.topicId;
            return {
                ...state,
                toDelete: _.uniq(_.concat(itemsForDeletion, [itemId])),
            };
        case "REMOVE_SESSION":
        case "DESELECT_SESSION_FOR_DELETION":
            itemId = action.sessionId;
        case "REMOVE_TOPIC":
        case "DESELECT_TOPIC_FOR_DELETION":
            itemId = itemId || action.topicId;
            index = _.findIndex(itemsForDeletion, (item) => {
                return (item === itemId);
            });
            before = itemsForDeletion.slice(0, index);   // before the one we are removing
            after = itemsForDeletion.slice(index + 1);   // after the one we are removing
            return {
                ...state,
                toDelete: [
                    ...before,
                    ...after,
                ],
                isEditingTitle: null,
            };
        case "SELECT_ALL_SESSIONS_FOR_DELETION":
            itemId = action.sessionId;
            selectedItems = action.sessions[action.topicId];
        case "SELECT_ALL_TOPICS_FOR_DELETION":
            itemId = itemId || action.topicId;
            selectedItems = selectedItems || action.topics;
            return {
                ...state,
                selectAllForDeletion: true,
                toDelete: _.uniq(_.concat(itemsForDeletion, selectedItems.map((item) => item.code))),
            };
        case "CREATE_TOPIC":
            return {
                ...state,
                isNew: {
                    topicId,
                    sessionId: state.isNew.sessionId
                },
            };
        case "CREATE_SESSION":
            return {
                ...state,
                isNew: {
                    topicId: state.isNew.topicId,
                    sessionId
                },
            };
        case "ADD_TOPIC":
            return {
                ...state,
                isNew: {
                    topicId: null,
                    sessionId: state.isNew.sessionId
                },
                isEditingTitle: null,
            };
        case "ADD_SESSION":
            return {
                ...state,
                isNew: {
                    topicId: state.isNew.topicId,
                    sessionId: null,
                },
                isEditingTitle: null,
            };
        case "UPDATE_SESSION":
            if (action.propName === "isRunning") {
                if (action.newValue) {
                    return {
                        ...state,
                        isRunning: {
                            topicId,
                            sessionId,
                        },
                    }
                } else {
                    return {
                        ...state,
                        isRunning: {
                            topicId: null,
                            sessionId: null,
                        },
                    }
                }
            }
            return state;
        case "EDIT_ITEM_TITLE":
            return {
                ...state,
                isEditingTitle: topicId,
            }
        default:
            return state;
    }
}

const supervisor = (state = {}, action) => {
    if ((typeof action.topicId !== "undefined") || (typeof action.sessionId !== "undefined")) {
        return postSupervisor(state, action);
    }
    switch(action.type) {
        case "SELECT_BOTTOM_NAV_INDEX":
            return {
                ...state,
                bottomNavSelectedIndex: action.index
            };
        case "DELETE_REQUESTED":
            return {
                ...state,
                deleteRequested: action.option
            };
        case "DISPLAY_SELECT_FOR_DELETION":
            return {
                ...state,
                displaySelectForDeletion: action.option
            };
        case "DESELECT_ALL_FOR_DELETION":
            return {
                ...state,
                selectAllForDeletion: false,
                toDelete: [],
            };
        case "EDIT_ITEM_TITLE":
            return {
                ...state,
                isEditingTitle: null,
            }
        case "OPEN_MENU":
            return {
                ...state,
                menuAnchor: action.option ? action.anchor : null,
            }
        case "OPEN_DIALOG":
            return {
                ...state,
                openDialog: action.option,
            }
        default:
            return state;
    }
    return state;
}

export default supervisor;
