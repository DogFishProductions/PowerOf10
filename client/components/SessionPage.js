import React from "react";

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import TimerIcon from 'material-ui-icons/Timer';
import TimerOffIcon from 'material-ui-icons/TimerOff';
import Grid from 'material-ui/Grid';

const fabStyle = {
    position: "absolute",
    top: "450px",
    left: "285px"
};
const gridStyle = {
    flexGrow: "1",
    margin: "8px 16px 0px 16px",
    width: "328px",
}
let fromHelperText = ""
let fromIsError = false;
let toHelperText = ""
let toIsError = false;

import {
    getBottomNavSelectedIndex,
    getSelectedItem,
    dispatchAction,
    durationToString,
    momentToDateString,
    momentToTimeString,
    momentIsInThePast,
    momentFromIsBeforeTo,
} from "../helpers";
import ItemAppBar from "./ItemAppBar";
import ItemBottomNavigation from "./ItemBottomNavigation";
import TargetPage from "./TargetPage";
import NotesPage from "./NotesPage";

let calcCurrentDuration;

const TopicPage = React.createClass({
    componentWillUnmount() {
        clearInterval(calcCurrentDuration);
        calcCurrentDuration = null;
        this.resetErrorState();
    },
    getSelectedSession() {
        return getSelectedItem(this.props, "code") || { isNew: true };
    },
    getFromDate() {
        return momentToDateString(this.getSelectedSession(), "from");
    },
    getFromTime() {
        return momentToTimeString(this.getSelectedSession(), "from");
    },
    getToDate() {
        return momentToDateString(this.getSelectedSession(), "to");
    },
    getToTime() {
        return momentToTimeString(this.getSelectedSession(), "to");
    },
    resetErrorState() {
        fromHelperText = "";
        fromIsError = false;
        toHelperText = "";
        toIsError = false;
    },
    canSetDateTime(targetId, fromDateTimeString, toDateTimeString) {
        const fromIsInPast = momentIsInThePast(fromDateTimeString);
        const toIsInPast = momentIsInThePast(toDateTimeString);
        const fromIsBeforeTo = momentFromIsBeforeTo(fromDateTimeString, toDateTimeString);
        if (!fromIsInPast) {
            fromHelperText = "Must be in the past";
            fromIsError = true;
            return false;
        }
        if (!toIsInPast) {
            toHelperText = "Must be in the past";
            toIsError = true;
            return false;
        }
        if (!fromIsBeforeTo) {
            switch(targetId) {
                case "fromDate":
                case "fromTime":
                    fromHelperText = "Must be before 'To'";
                    fromIsError = true;
                    break;
                case "toDate":
                case "toTime":
                    toHelperText = "Must be after 'From'";
                    toIsError = true;
                    break;
                default:
                    this.forceUpdate();
            }
            return false;
        }
        return true;
    },
    selectedSessionIsRunning() {
        const selectedSession = this.getSelectedSession();
        return selectedSession.isRunning;
    },
    handleStartSessionOnClick(e) {
        if (this.selectedSessionIsRunning()) {
            dispatchAction(this.props, "updateItemProperty", "isRunning", false);
            clearInterval(calcCurrentDuration);
            calcCurrentDuration = null;
        } else {
            dispatchAction(this.props, "updateItemProperty", "to", Date.now());
            dispatchAction(this.props, "updateItemProperty", "isRunning", true);
        }
    },
    handleDateTimeOnChange(e) {
        const target = e.target;
        const prop = target.id;
        const newValue = target.value
        const arg = {};
        arg[prop] = newValue;
        const {
            fromDate = this.getFromDate(),
            fromTime = this.getFromTime(),
            toDate = this.getToDate(),
            toTime = this.getToTime(),
        } = arg;
        const fromDateTimeString = `${fromDate}, ${fromTime}`;
        const toDateTimeString = `${toDate}, ${toTime}`;
        if (this.canSetDateTime(target.id, fromDateTimeString, toDateTimeString)) {
            this.resetErrorState();
            switch(prop) {
                case "fromDate":
                case "fromTime":
                    return dispatchAction(this.props, "updateItemProperty", "from", Date.parse(fromDateTimeString));
                case "toDate":
                case "toTime":
                    return dispatchAction(this.props, "updateItemProperty", "to", Date.parse(toDateTimeString));
                default:
                    return;
            }
        }
        this.forceUpdate();
    },
    renderStartSessionIcon() {
        if (this.selectedSessionIsRunning()) {
            return (<TimerOffIcon />);
        }
        return (<TimerIcon />);
    },
    renderToDateTime() {
        if (this.selectedSessionIsRunning()) {
            return (
                <Grid
                    container
                    spacing={ 24 }
                    style={ gridStyle }
                >
                    <Grid item xs={ 8 }>
                        <TextField
                            id="toDate"
                            helperText={ toHelperText }
                            error={ toIsError }
                            label="To"
                            type="date"
                            value={ this.getToDate() }
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            id="toTime"
                            error={ toIsError }
                            label="To"
                            type="time"
                            value={ this.getToTime() }
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
            );
        }
        return (
            <Grid
                container
                spacing={ 24 }
                style={ gridStyle }
            >
                <Grid item xs={ 8 }>
                    <TextField
                        id="toDate"
                        helperText={ toHelperText }
                        error={ toIsError }
                        onChange={ this.handleDateTimeOnChange }
                        label="To"
                        type="date"
                        defaultValue={ this.getToDate() }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="toTime"
                        error={ toIsError }
                        onChange={ this.handleDateTimeOnChange }
                        label="To"
                        type="time"
                        defaultValue={ this.getToTime() }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
            </Grid>
        );
    },
    renderDetailView() {
        const selectedIndex = getBottomNavSelectedIndex(this.props);
        switch(selectedIndex) {
            case 0:
                return (
                    <div>
                        <Grid
                            container
                            spacing={ 24 }
                            style={ gridStyle }
                        >
                            <Grid item xs>
                                <TextField
                                    label="Time Spent"
                                    disabled={ true }
                                    fullWidth={ true }
                                    value={ durationToString([this.getSelectedSession()], "long") }
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={ 24 }
                            style={ gridStyle }
                        >
                            <Grid item xs={ 8 }>
                                <TextField
                                    id="fromDate"
                                    helperText={ fromHelperText }
                                    error={ fromIsError }
                                    onChange={ this.handleDateTimeOnChange }
                                    label="From"
                                    type="date"
                                    defaultValue={ this.getFromDate() }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    id="fromTime"
                                    error={ fromIsError }
                                    onChange={ this.handleDateTimeOnChange }
                                    label="From"
                                    type="time"
                                    defaultValue={ this.getFromTime() }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        { this.renderToDateTime() }
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
    renderFloatingStartSessionButton() {
        const selectedSession = this.getSelectedSession();
        if (selectedSession.isNew ||
            (selectedSession.to === selectedSession.from) ||
            selectedSession.isRunning) { 
            return (
                <div className="floating-button-bottom-right">
                    <Button
                        variant="fab"
                        color="primary"
                        style={ { top: "-56px" } }
                        onClick={ this.handleStartSessionOnClick }>
                        { this.renderStartSessionIcon() }
                    </Button>
                </div>
            ) 
        }
        return;
    },
    render() {
        if (this.selectedSessionIsRunning() && !calcCurrentDuration) {
            calcCurrentDuration = setInterval(
                () => {
                    dispatchAction(this.props, "updateItemProperty", "to", Date.now());
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
                    { this.renderFloatingStartSessionButton() }
                    <div className="bottom-nav">
                        <ItemBottomNavigation { ...this.props } />
                    </div>
                </div>
            </div>
        )
    }
});

export default TopicPage;
