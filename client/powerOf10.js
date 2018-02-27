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
import AddTopicPage from "./components/AddTopicPage";

const router = (
    <Provider store={ store }>
        <Router history={ history }>
            <Route path="/" component={ App }>
                <IndexRoute component={ TopicListPage }></IndexRoute>
                <Route path="/view/:topicId" component={ TopicPage }></Route>
                <Route path="/topic" component={ AddTopicPage }></Route>
            </Route>
        </Router>
    </Provider>
);

render(router, document.getElementById('root'));
