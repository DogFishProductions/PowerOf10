import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import sessions from './sessions';
import topics from './topics';
import supervisor from './supervisor';

const rootReducer = combineReducers({
    supervisor,
    sessions,
    topics,
    routing: routerReducer
});

export default rootReducer;
