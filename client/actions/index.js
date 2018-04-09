import * as itemActions from "./itemActions";
import * as supervisorActions from "./supervisorActions";

const displayDeleteSelectorAndMenu = (show) => {
    return [
        supervisorActions.displaySelectForDeletion(show),
        supervisorActions.deleteRequested(show),
    ];
};

const cancelPageMenu = () => {
    return [
        displayDeleteSelectorAndMenu(false),
        supervisorActions.deselectAllForDeletion(),
        supervisorActions.openMenu(false),
    ];
};

const closeMenuAndShowDeleteSelector = () => {
    return [
        displayDeleteSelectorAndMenu(true),
        supervisorActions.openMenu(false),
    ];
};

const closeDeleteDialogAndCancelPageMenu = () => {
    return [
        supervisorActions.openDialog(false),
        cancelPageMenu(),
    ];
};

const updateSessionToFrom = (sessionId, topicId, propName, newValue, change) => {
    console.log(change)
    return [
        itemActions.updateItemProperty("session", sessionId, propName, newValue, topicId),
        itemActions.incrementDuration("topic", change, topicId),
    ];
};

const addSession = (item, topicId) => {
    const duration = _.get(item, "to", 0) - _.get(item, "from", 0);
    return [
        itemActions.addItem("session", sessionId, topicId),
        itemActions.incrementDuration("topic", duration, topicId),
    ];
};

const deleteSession = (item, sessionId, topicId) => {
    const duration = _.get(item, "from", 0) - _.get(item, "to", 0);
    return [
        itemActions.removeItem("session", sessionId, topicId),
        itemActions.incrementDuration("topic", duration, topicId),
    ];
};

const actionCreators = {
    ...itemActions,
    ...supervisorActions,
    displayDeleteSelectorAndMenu,
    cancelPageMenu,
    closeMenuAndShowDeleteSelector,
    closeDeleteDialogAndCancelPageMenu,
    updateSessionToFrom,
    addSession,
    deleteSession,
};

export default actionCreators;
