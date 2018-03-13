import { createStore, compose, applyMiddleware } from "redux";
import { syncHistoryWithStore } from "react-router-redux";
import { browserHistory } from "react-router";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import firebase from "firebase";

import rootReducer from "./reducers";
import topics from "./data/topics";
import sessions from "./data/sessions";

const firebaseConfig = {
    apiKey: "AIzaSyDvcx7XjKawUJvYqeerYyZ_jEOQxLQmM58",
    authDomain: "power-of-10.firebaseapp.com",
    databaseURL: "https://power-of-10.firebaseio.com",
    storageBucket: "power-of-10.appspot.com",
}

// initialize firebase instance
firebase.initializeApp(firebaseConfig);

// react-redux-firebase options
const rrfConfig = {
    userProfile: "users",
    attachAuthIsReady: true,
    firebaseStateName: "firebase",
}

const defaultState = {
    sessions,
    topics,
    supervisor: {
        authorisedUserId: null,
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

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
)(createStore);

const store = createStoreWithFirebase(
    rootReducer,
    defaultState,
    enhancers,
);

export const history = syncHistoryWithStore(browserHistory, store);
if (module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers').default;
        store.replaceReducer(nextRootReducer);
    })
}

store.firebaseAuthIsReady.then(() => {
    console.log("Auth has loaded");
})

export default store;
