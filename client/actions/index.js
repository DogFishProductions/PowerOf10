import * as itemActions from "./itemActions";
import * as supervisorActions from "./supervisorActions";

const cancelPageMenu = () => {
    return [
        supervisorActions.displaySelectForDeletion(false),
        supervisorActions.deleteRequested(false),
        supervisorActions.deselectAllForDeletion(),
        supervisorActions.openMenu(false),
    ]
};

const actionCreators = {
    ...itemActions,
    ...supervisorActions,
    cancelPageMenu,
};

export default actionCreators;
