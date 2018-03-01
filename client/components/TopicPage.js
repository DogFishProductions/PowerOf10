import React from "react";

import TextField from 'material-ui/TextField';

const fabStyle = {
    position: "absolute",
    top: "450px",
    left: "285px"
};
const timeSpentStyle = {
    position: "absolute",
    left: "-128px",
    margin: "0 50%",
    width: "256px"
}

import { getBottomNavSelectedIndex, getSelectedItem, dispatchAction, durationToString, getTopicSessions } from "../helpers";
import ItemAppBar from "./ItemAppBar";
import TopicBottomNavigation from "./TopicBottomNavigation";
// import SessionList from "./SessionList";
import TargetPage from "./TargetPage";
import NotesPage from "./NotesPage";

const TopicPage = React.createClass({
    getSelectedTopic() {
        return getSelectedItem(this.props, "code") || { isNew: true };
    },
    renderDetailView() {
        const selectedIndex = getBottomNavSelectedIndex(this.props);
        const defaultSessionListText = this.getSelectedTopic().isNew ? "Save topic to start recording sessions" : "Start recording sessions";
        switch(selectedIndex) {
            case 0:
                // return (
                //     <div>
                //         <TextField
                //             floatingLabelText="Time Spent"
                //             disabled={ true }
                //             style={ timeSpentStyle }
                //             value={ durationToString(getTopicSessions(this.props)) }
                //         />
                //         <SessionList { ...this.props } defaultText={ defaultSessionListText }/>
                //     </div>
                // );
                return (
                    <div>
                        <TextField
                            floatingLabelText="Time Spent"
                            disabled={ true }
                            style={ timeSpentStyle }
                            value={ durationToString(getTopicSessions(this.props)) }
                        />
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
                // return (
                //     <div>
                //         <SessionList { ...this.props } defaultText={ defaultSessionListText }/>
                //     </div>
                // );
                return (
                    <div>
                        <TextField
                            floatingLabelText="Time Spent"
                            disabled={ true }
                            style={ timeSpentStyle }
                            value={ durationToString(getTopicSessions(this.props)) }
                        />
                    </div>
                );
        }
    },
    handleDivOnClick(e) {
        console.log("here")
        dispatchAction(this.props, "endEditItemTitle");
    },
    render() {
        // return (
        //     <div className="pseudo-phone-main outer">
        //         <ItemAppBar { ...this.props } />
        //         <div className="pseudo-phone-list-no-scroll inner" onClick={ (e) => this.handleDivOnClick(e) }>
        //             { this.renderDetailView() }
        //         </div>
        //         <div className="inner">
        //             <div className="bottom-nav" onClick={ (e) => this.handleDivOnClick(e) }>
        //                 <TopicBottomNavigation { ...this.props } />
        //             </div>
        //         </div>
        //     </div>
        // )
        return (
            <div className="pseudo-phone-main outer">
                <ItemAppBar { ...this.props } />
                <div className="pseudo-phone-list-no-scroll inner" onClick={ this.handleDivOnClick }>
                    { this.renderDetailView() }
                </div>
                <div className="inner">
                    <div className="bottom-nav" onClick={ this.handleDivOnClick }>
                        <TopicBottomNavigation { ...this.props } />
                    </div>
                </div>
            </div>
        )
    }
});

export default TopicPage;
