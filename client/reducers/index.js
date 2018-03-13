import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { firebaseReducer } from "react-redux-firebase";

import sessions from "./sessions";
import topics from "./topics";
import supervisor from "./supervisor";

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    supervisor,
    sessions,
    topics,
    routing: routerReducer
});

export default rootReducer;
