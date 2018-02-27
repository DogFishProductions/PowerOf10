import React from "react";

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const fabStyle = {
    position: "absolute",
    top: "450px",
    left: "285px"
};

import * as helpers from "../helpers";
import NewItemAppBar from "./NewItemAppBar";
import TopicList from "./TopicList";
import TopicBottomNavigation from "./TopicBottomNavigation";

import SessionList from "./SessionList";
import TargetPage from "./TargetPage";
import NotesPage from "./NotesPage";

const AddTopicPage = React.createClass({
    renderDetailView() {
        const selectedIndex = helpers.getBottomNavSelectedIndex(this.props);
        const { topicId } = this.props.params;
        switch(selectedIndex) {
            case 0: 
                return (
                    <div>
                        <SessionList { ...this.props }  topicId={topicId}/>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <TargetPage { ...this.props }  topicId={topicId}/>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <NotesPage { ...this.props }  topicId={topicId}/>
                    </div>
                );
            default:
                return (
                    <div>
                        <SessionList { ...this.props }  topicId={topicId}/>
                    </div>
                );
        }
    },
    render() {
        return (
            <div className="pseudo-phone-main outer">
                <NewItemAppBar { ...this.props } title="topic" />
                <div className="pseudo-phone-list inner">
                    { this.renderDetailView() }
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
