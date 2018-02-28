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

const TopicPage = React.createClass({
    getSelectedTopic() {
        return helpers.getSelectedItem(this.props, "code") || { isNew: true };
    },
    renderDetailView() {
        const selectedIndex = helpers.getBottomNavSelectedIndex(this.props);
        const defaultSessionListText = this.getSelectedTopic().isNew ? "Save topic to start recording sessions" : "Start recording sessions";
        switch(selectedIndex) {
            case 0:
                return (
                    <div>
                        <SessionList { ...this.props } defaultText={ defaultSessionListText }/>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <TargetPage { ...this.props }/>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <NotesPage { ...this.props }/>
                    </div>
                );
            default:
                return (
                    <div>
                        <SessionList { ...this.props } defaultText={ defaultSessionListText }/>
                    </div>
                );
        }
    },
    handleDivOnClick(e) {
        helpers.dispatchAction(this.props, "endEditItemTitle");
    },
    render() {
        return (
            <div className="pseudo-phone-main outer">
                <NewItemAppBar { ...this.props } />
                <div className="pseudo-phone-list inner" onClick={ (e) => this.handleDivOnClick(e) }>
                    { this.renderDetailView() }
                </div>
                <div className="inner">
                    <div className="bottom-nav" onClick={ (e) => this.handleDivOnClick(e) }>
                        <TopicBottomNavigation { ...this.props } />
                    </div>
                </div>
            </div>
        )
    }
});

export default TopicPage;
