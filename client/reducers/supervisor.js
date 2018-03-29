import * as _ from "lodash";

import { actionTypes } from "../constants";
import {
    firestoreMetaHasSessions,
    findFirestoreMetaSubCollection,
} from "../helpers";

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
    UPDATE_TOPIC,
    UPDATE_SESSION,
    EDIT_ITEM_TITLE,
    SELECT_BOTTOM_NAV_INDEX,
    DELETE_REQUESTED,
    DISPLAY_SELECT_FOR_DELETION,
    DESELECT_ALL_FOR_DELETION,
    OPEN_MENU,
    OPEN_DIALOG,
    SESSION_IS_RUNNING,
} = actionTypes;

const postSupervisor = (state = {}, action) => {
    const {
        type,
        topics,
        sessions,
        topicId,
        sessionId,
        option,
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
        case DESELECT_SESSION_FOR_DELETION:
            itemId = sessionId;
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
        case REMOVE_TOPIC:
            if (topicId === state.isRunning.topicId) {
                return {
                    ...state,
                    isRunning: {
                        topicId: null,
                        sessionId: null,
                    },
                }
            }
            return state;
        case REMOVE_SESSION:
            if (sessionId === state.isRunning.sessionId) {
                return {
                    ...state,
                    isRunning: {
                        topicId: null,
                        sessionId: null,
                    },
                }
            }
            return state;
        case UPDATE_TOPIC:
            const topicsRequiringUpdate = _.get(state, "requiresUpdate.topics", []);
            if (topicsRequiringUpdate.indexOf(topicId) < 0) {
                return {
                    ...state,
                    requiresUpdate: {
                        topics: [
                            ...topicsRequiringUpdate,
                            topicId,
                        ],
                        sessions: _.get(state, "requiresUpdate.sessions", []),
                    },
                }
            }
            return state;
        case UPDATE_SESSION:
            const sessionsRequiringUpdate = _.get(state, "requiresUpdate.sessions", {});
            const sessionsRequiringUpdateByTopic = _.get(sessionsRequiringUpdate, topicId, []);
            if (sessionsRequiringUpdateByTopic.indexOf(sessionId) < 0) {
                return {
                    ...state,
                    requiresUpdate: {
                        topics: _.get(state, "requiresUpdate.topics", []),
                        sessions: {
                            ...sessionsRequiringUpdate,
                            [topicId]: [
                                ...sessionsRequiringUpdateByTopic,
                                sessionId,
                            ],
                        },
                    },
                }
            }
            return state;
        case SESSION_IS_RUNNING:
            if (!option) {
                return {
                    ...state,
                    isRunning: {
                        topicId: null,
                        sessionId: null,
                    },
                }
            } else {
                return {
                        ...state,
                        isRunning: {
                            topicId,
                            sessionId,
                        },
                    }
            }
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
        case SESSION_IS_RUNNING:
            if (!option) {
                return {
                    ...state,
                    isRunning: {
                        topicId: null,
                        sessionId: null,
                    },
                }
            } else {
                return state;
            }
        case "@@reduxFirestore/GET_REQUEST":
            return {
                ...state,
                isFetching: true,
                isLoaded: false,
            }
        case "@@reduxFirestore/GET_SUCCESS":
            return {
                ...state,
                isFetching: false,
                isLoaded: true,
            }
        case "@@reduxFirestore/GET_FAILURE":
        return {
                ...state,
                isFetching: false,
                isloaded: true,
            }
        case "@@reduxFirestore/DELETE_SUCCESS":
        case "@@reduxFirestore/UPDATE_SUCCESS":
            const topic = findFirestoreMetaSubCollection(action.meta, "topics");
            if (!firestoreMetaHasSessions(action.meta)) {
                if (topic) {
                    const topicId = topic.doc;
                    if (topicId) {
                        const topicsRequiringUpdate = _.get(state, "requiresUpdate.topics", []);
                        const index = topicsRequiringUpdate.indexOf(topicId);
                        if (index >= 0) {
                            const before = topicsRequiringUpdate.slice(0, index);
                            const after = topicsRequiringUpdate.slice(index + 1);
                            return {
                                ...state,
                                requiresUpdate: {
                                    topics: [
                                        ...before,
                                        ...after,
                                    ],
                                    sessions: _.get(state, "requiresUpdate.sessions", []),
                                },
                            } 
                        }
                    }
                }
            } else {
                const session = findFirestoreMetaSubCollection(action.meta, "sessions");
                if (session) {
                    const sessionId = session.doc;
                    if (sessionId) {
                        const sessionsRequiringUpdate = _.get(state, "requiresUpdate.sessions", {});
                        const sessionsRequiringUpdateByTopic = _.get(sessionsRequiringUpdate, _.get(topic, "doc", -1), []);
                        const index = sessionsRequiringUpdateByTopic.indexOf(sessionId);
                        if (index >= 0) {
                            const before = sessionsRequiringUpdateByTopic.slice(0, index);
                            const after = sessionsRequiringUpdateByTopic.slice(index + 1);
                            return {
                                ...state,
                                requiresUpdate: {
                                    topics: _.get(state, "requiresUpdate.topics", []),
                                    sessions: {
                                        ...sessionsRequiringUpdate,
                                        [topic.doc]: [
                                            ...before,
                                            ...after,
                                        ],
                                    },
                                },
                            } 
                        }
                    }
                }
            }
        case "@@reduxFirestore/UPDATE_REQUEST":
        case "@@reduxFirestore/UPDATE_FAILURE":
        case "@@reduxFirestore/DELETE_REQUEST":
        case "@@reduxFirestore/DELETE_FAILURE":
        case "@@reduxFirestore/ADD_REQUEST":
        case "@@reduxFirestore/ADD_SUCCESS":
        case "@@reduxFirestore/ADD_FAILURE":
        case "@@reduxFirestore/SET_REQUEST":
        case "@@reduxFirestore/SET_SUCCESS":
        case "@@reduxFirestore/SET_FAILURE":
        default:
            return state;
    }
    return state;
}

export default supervisor;
