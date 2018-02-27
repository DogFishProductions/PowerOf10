import React from "react";

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const fabStyle = {
    position: "absolute",
    top: "450px",
    left: "285px"
};

import NewItemAppBar from "./NewItemAppBar";
import TopicList from "./TopicList";
import TopicBottomNavigation from "./TopicBottomNavigation";

const AddTopicPage = React.createClass({
    render() {
        return (
            <div className="pseudo-phone-main outer">
                <NewItemAppBar { ...this.props } title="topic" />
                <div className="pseudo-phone-list inner">
                    <div>
                        <TopicList { ...this.props } />
                    </div>
                </div>
                <div className="inner">
                    <div className="bottom-nav">
                        <TopicBottomNavigation { ...this.props } />
                    </div>
                </div>
            </div>
        )
    }
});

export default AddTopicPage;
