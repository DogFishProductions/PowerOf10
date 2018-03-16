import * as _ from "lodash";

import { actionTypes } from "../constants";

const {
    SELECT_SESSION_FOR_DELETION,
    SELECT_TOPIC_FOR_DELETION,
    REMOVE_SESSION,
    DESELECT_SESSION_FOR_DELETION,
    REMOVE_TOPIC,
    DESELECT_TOPIC_FOR_DELETION,
    SELECT_ALL_SESSIONS_FOR_DELETION,
    SELECT_ALL_TOPICS_FOR_DELETION,
    CREATE_TOPIC,
    CREATE_SESSION,
    ADD_TOPIC,
    ADD_SESSION,
    UPDATE_SESSION,
    EDIT_ITEM_TITLE,
    SELECT_BOTTOM_NAV_INDEX,
    DELETE_REQUESTED,
    DISPLAY_SELECT_FOR_DELETION,
    DESELECT_ALL_FOR_DELETION,
    OPEN_MENU,
    OPEN_DIALOG,
} = actionTypes;

const postSupervisor = (state = {}, action) => {
    const {
        type,
        topics,
        sessions,
        topicId,
        sessionId,
    } = action;
    const itemsForDeletion = state.toDelete || [];
    let index, before, after;
    let itemId, selectedItems;
    switch(type) {
        case SELECT_SESSION_FOR_DELETION:
            itemId = sessionId;
        case SELECT_TOPIC_FOR_DELETION:
            itemId = itemId || topicId;
            return {
                ...state,
                toDelete: _.uniq(_.concat(itemsForDeletion, [itemId])),
            };
        case REMOVE_SESSION:
        case DESELECT_SESSION_FOR_DELETION:
            itemId = sessionId;
        case REMOVE_TOPIC:
        case DESELECT_TOPIC_FOR_DELETION:
            itemId = itemId || topicId;
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
        case SELECT_ALL_SESSIONS_FOR_DELETION:
            itemId = sessionId;
            selectedItems = sessions[topicId];
        case SELECT_ALL_TOPICS_FOR_DELETION:
            itemId = itemId || topicId;
            selectedItems = selectedItems || topics;
            return {
                ...state,
                selectAllForDeletion: true,
                toDelete: _.uniq(_.concat(itemsForDeletion, selectedItems.map((item) => item.code))),
            };
        case CREATE_TOPIC:
            return {
                ...state,
                isNew: {
                    topicId,
                    sessionId: state.isNew.sessionId
                },
            };
        case CREATE_SESSION:
            return {
                ...state,
                isNew: {
                    topicId: state.isNew.topicId,
                    sessionId
                },
            };
        case ADD_TOPIC:
            return {
                ...state,
                isNew: {
                    topicId: null,
                    sessionId: state.isNew.sessionId
                },
                isEditingTitle: null,
            };
        case ADD_SESSION:
            return {
                ...state,
                isNew: {
                    topicId: state.isNew.topicId,
                    sessionId: null,
                },
                isEditingTitle: null,
            };
        case UPDATE_SESSION:
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
        case EDIT_ITEM_TITLE:
            return {
                ...state,
                isEditingTitle: topicId,
            }
        default:
            return state;
    }
}

const supervisor = (state = {}, action) => {
    const {
        type,
        index,
        option,
        topicId,
        sessionId,
        anchor,
    } = action;

    if ((typeof topicId !== "undefined") || (typeof sessionId !== "undefined")) {
        return postSupervisor(state, action);
    }
    switch(type) {
        case SELECT_BOTTOM_NAV_INDEX:
            return {
                ...state,
                bottomNavSelectedIndex: index
            };
        case DELETE_REQUESTED:
            return {
                ...state,
                deleteRequested: option
            };
        case DISPLAY_SELECT_FOR_DELETION:
            return {
                ...state,
                displaySelectForDeletion: option
            };
        case DESELECT_ALL_FOR_DELETION:
            return {
                ...state,
                selectAllForDeletion: false,
                toDelete: [],
            };
        case EDIT_ITEM_TITLE:
            return {
                ...state,
                isEditingTitle: null,
            }
        case OPEN_MENU:
            return {
                ...state,
                menuAnchor: option ? anchor :null,
            }
        case OPEN_DIALOG:
            return {
                ...state,
                openDialog: option,
            }
        default:
            return state;
    }
    return state;
}

export default supervisor;
