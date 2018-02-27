import React from "react";

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import * as helpers from "../helpers";
import TopicListAppBar from "./TopicListAppBar";
import TopicList from "./TopicList";

const TopicListPage = React.createClass({
    render() {
        return (
            <div className="pseudo-phone-main outer">
                <TopicListAppBar />
                <div className="pseudo-phone-list inner">
                    <div>
                        <TopicList {...this.props} />
                    </div>
                </div>
                <div className="inner">
                    <FloatingActionButton
                        className="floating-button-bottom-right"
                        onClick={ () => { this.props.addTopic(this.helpers.randomString(10, "aA#!")) } }
                    >
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
            </div>
        )
    }
})

export default TopicListPage;
