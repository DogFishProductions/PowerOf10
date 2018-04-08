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

const actionCreators = {
    ...itemActions,
    ...supervisorActions,
    displayDeleteSelectorAndMenu,
    cancelPageMenu,
    closeMenuAndShowDeleteSelector,
    closeDeleteDialogAndCancelPageMenu,
};

export default actionCreators;
