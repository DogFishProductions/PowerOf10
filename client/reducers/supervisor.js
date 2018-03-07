export default function supervisor(state = {}, action) {
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
        case "SELECT_FOR_DELETION":
            return {
                ...state,
                selectForDeletion: action.option
            };
        default:
            return state;
    }
    return state;
}
