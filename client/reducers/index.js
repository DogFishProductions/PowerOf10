import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import sessions from './sessions';
import topics from './topics';
import navigation from './navigation';

const rootReducer = combineReducers({
    navigation,
    sessions,
    topics,
    routing: routerReducer
});

export default rootReducer;
