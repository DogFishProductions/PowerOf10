import { createStore, compose } from "redux";
import { syncHistoryWithStore } from "react-router-redux";
import { browserHistory } from "react-router";

import rootReducer from "./reducers";
import topics from "./data/topics";
import sessions from "./data/sessions";

const defaultState = {
    sessions,
    topics,
    supervisor: {
        uid: null,
        bottomNavSelectedIndex: 0,
        deleteRequested: false,
        displaySelectForDeletion: false,
        selectAllForDeletion: false,
        toDelete: [],
        isNew: { topicId: null, sessionId: null },
        isEditingTitle: null,
        menuAnchor: null,
        openDialog: false,
        isRunning: { topicId: null, sessionId: null },
    }
};

const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(rootReducer, defaultState, enhancers);

export const history = syncHistoryWithStore(browserHistory, store);
if (module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers').default;
        store.replaceReducer(nextRootReducer);
    })
}

export default store;
