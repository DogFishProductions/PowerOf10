import React from "react";

import TopicAppBar from "./TopicAppBar";
import SessionList from "./SessionList";

const TopicPage = React.createClass({
    render() {
        const { topicId } = this.props.params;
        return (
            <div className="pseudo-phone-main">
                <TopicAppBar { ...this.props } />
                <div className="pseudo-phone-list">
                    <SessionList {...this.props } topicId={topicId}>
                    </SessionList>
                </div>
            </div>
        )
    }
})

export default TopicPage;
