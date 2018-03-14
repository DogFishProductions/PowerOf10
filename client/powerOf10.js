import React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRedirect } from "react-router";
import { Provider } from "react-redux";

import store, { history } from "./store";
import { userIsAuthenticated, userIsAuthorised, userIsNotAuthenticated } from "./auth";

// import css
import css from "./styles/style.styl";

// import components
import App from "./components/App";
import LoginPage from "./components/LoginPage";
import TopicListPage from "./components/TopicListPage";
import TopicPage from "./components/TopicPage";
import SessionPage from "./components/SessionPage";

const router = (
    <Provider store={ store }>
        <Router history={ history }>
            <Route path="/" component={ App }>
                <IndexRedirect to="/login"></IndexRedirect>
                <Route path="/login" component={ userIsNotAuthenticated(LoginPage) }></Route>
                <Route path="/user/:uid" component={ userIsAuthenticated(userIsAuthorised(TopicListPage)) }></Route>
                <Route path="/user/:uid/topic/:topicId" component={ userIsAuthenticated(userIsAuthorised(TopicPage)) }></Route>
                <Route path="/user/:uid/topic/:topicId/session/:sessionId" component={ userIsAuthenticated(userIsAuthorised(SessionPage)) }></Route>
            </Route>
        </Router>
    </Provider>
);


render(router, document.getElementById('root'));
