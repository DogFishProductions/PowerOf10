export default function navigation(state = {}, action) {
    switch(action.type) {
        case 'SELECT_BOTTOM_NAV_INDEX':
            return {
                ...state,
                bottomNavSelectedIndex: action.index
            };
        default:
            return state;
    }
    return state;
}
