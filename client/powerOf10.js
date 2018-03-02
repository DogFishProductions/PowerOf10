import React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute } from "react-router";
import { Provider } from "react-redux";

import store, { history } from "./store";

// import css
import css from "./styles/style.styl";

// import components
import App from "./components/App";
import TopicListPage from "./components/TopicListPage";
import TopicPage from "./components/TopicPage";
import SessionPage from "./components/SessionPage";

const router = (
    <Provider store={ store }>
        <Router history={ history }>
            <Route path="/" component={ App }>
                <IndexRoute component={ TopicListPage }></IndexRoute>
                <Route path="/topic/:topicId" component={ TopicPage }></Route>
                <Route path="/topic/:topicId/session/:sessionId" component={ SessionPage }></Route>
            </Route>
        </Router>
    </Provider>
);


render(router, document.getElementById('root'));
