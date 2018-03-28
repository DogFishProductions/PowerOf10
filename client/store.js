import { createStore, combineReducers, compose } from "redux";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";
import { browserHistory } from "react-router";
import firebase from "firebase";
import 'firebase/firestore' // add this to use Firestore
import { reactReduxFirebase } from "react-redux-firebase";
import { reduxFirestore } from 'redux-firestore';

import rootReducer from "./reducers";

const firebaseConfig = {
    apiKey: "AIzaSyDvcx7XjKawUJvYqeerYyZ_jEOQxLQmM58",
    authDomain: "power-of-10.firebaseapp.com",
    databaseURL: "https://power-of-10.firebaseio.com",
    storageBucket: "power-of-10.appspot.com",
    projectId: "power-of-10",
}

// initialize firebase instance
firebase.initializeApp(firebaseConfig);

// initialize firestore
firebase.firestore();

// react-redux-firebase options
const rrfConfig = {
    userProfile: "users",
    attachAuthIsReady: true,
    firebaseStateName: "firebase",
}

const defaultState = {
    sessions: [],
    topics: [],
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
    reduxFirestore(firebase),
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
