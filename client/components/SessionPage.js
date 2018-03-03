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
    margin: "8px 50%",
    width: "256px"
}

import { getBottomNavSelectedIndex, getSelectedItem, dispatchAction, durationToString, momentToDateString, momentToTimeString } from "../helpers";
import ItemAppBar from "./ItemAppBar";
import ItemBottomNavigation from "./ItemBottomNavigation";
import TargetPage from "./TargetPage";
import NotesPage from "./NotesPage";

let calcCurrentDuration;

const TopicPage = React.createClass({
    componentWillUnmount() {
        clearInterval(calcCurrentDuration);
        calcCurrentDuration = null;
    },
    getSelectedSession() {
        return getSelectedItem(this.props, "code") || { isNew: true };
    },
    renderDetailView() {
        const selectedIndex = getBottomNavSelectedIndex(this.props);
        switch(selectedIndex) {
            case 0:
                return (
                    <div>
                        <TextField
                            label="Time Spent"
                            disabled={ true }
                            style={ timeSpentStyle }
                            value={ durationToString([this.getSelectedSession()], "long") }
                        />
                        <TextField
                            label="From"
                            type="date"
                            defaultValue={ momentToDateString(this.getSelectedSession(), "from") }
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="From"
                            type="time"
                            defaultValue={ momentToTimeString(this.getSelectedSession(), "from") }
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="To"
                            type="date"
                            defaultValue={ momentToDateString(this.getSelectedSession(), "to") }
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="To"
                            type="time"
                            defaultValue={ momentToTimeString(this.getSelectedSession(), "to") }
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                return (
                    <div>
                        <span>blah</span>
                    </div>
                );
        }
    },
    render() {
        const selectedSession = this.getSelectedSession();
        console.log("dur: ", calcCurrentDuration);
        if ((selectedSession.isNew || selectedSession.isRunning) && !calcCurrentDuration) {   
            calcCurrentDuration = setInterval(
                () => {
                    dispatchAction(this.props, "updateItemProperty", "to", Date.now());
                    console.log(durationToString([this.getSelectedSession()], "long"));
                },
                900,
            );
        }
        return (
            <div className="pseudo-phone-main outer">
                <ItemAppBar { ...this.props } />
                <div className="pseudo-phone-list-no-scroll inner">
                    { this.renderDetailView() }
                </div>
                <div className="inner">
                    <div className="bottom-nav">
                        <ItemBottomNavigation { ...this.props } />
                    </div>
                </div>
            </div>
        )
    }
});

export default TopicPage;
