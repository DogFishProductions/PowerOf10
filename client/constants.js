export const actionsPrefix = "@@powerOf10";

export const actionTypes = {
    UPDATE_TOPIC: `${actionsPrefix}/UPDATE_TOPIC`,
    UPDATE_SESSION: `${actionsPrefix}/UPDATE_SESSION`,
    CREATE_TOPIC: `${actionsPrefix}/CREATE_TOPIC`,
    CREATE_SESSION: `${actionsPrefix}/CREATE_SESSION`,
    ADD_TOPIC: `${actionsPrefix}/ADD_TOPIC`,
    ADD_SESSION: `${actionsPrefix}/ADD_SESSION`,
    REMOVE_TOPIC: `${actionsPrefix}/REMOVE_TOPIC`,
    REMOVE_SESSION: `${actionsPrefix}/REMOVE_SESSION`,
    SELECT_BOTTOM_NAV_INDEX: `${actionsPrefix}/SELECT_BOTTOM_NAV_INDEX`,
    DELETE_REQUESTED: `${actionsPrefix}/DELETE_REQUESTED`,
    DISPLAY_SELECT_FOR_DELETION: `${actionsPrefix}/DISPLAY_SELECT_FOR_DELETION`,
    SELECT_ALL_TOPICS_FOR_DELETION: `${actionsPrefix}/SELECT_ALL_TOPICS_FOR_DELETION`,
    SELECT_ALL_SESSIONS_FOR_DELETION: `${actionsPrefix}/SELECT_ALL_SESSIONS_FOR_DELETION`,
    DESELECT_ALL_FOR_DELETION: `${actionsPrefix}/DESELECT_ALL_FOR_DELETION`,
    SELECT_TOPIC_FOR_DELETION: `${actionsPrefix}/SELECT_TOPIC_FOR_DELETION`,
    SELECT_SESSION_FOR_DELETION: `${actionsPrefix}/SELECT_SESSION_FOR_DELETION`,
    DESELECT_TOPIC_FOR_DELETION: `${actionsPrefix}/DESELECT_TOPIC_FOR_DELETION`,
    DESELECT_SESSION_FOR_DELETION: `${actionsPrefix}/DESELECT_SESSION_FOR_DELETION`,
    EDIT_ITEM_TITLE: `${actionsPrefix}/EDIT_ITEM_TITLE`,
    OPEN_MENU: `${actionsPrefix}/OPEN_MENU`,
    OPEN_DIALOG: `${actionsPrefix}/OPEN_DIALOG`,
    SESSION_IS_RUNNING: `${actionsPrefix}/SESSION_IS_RUNNING`,
}

export default {
    actionsPrefix,
    actionTypes,
}
