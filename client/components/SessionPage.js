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

const resetErrorState = () => {
    fromHelperText = "";
    fromIsError = false;
    toHelperText = "";
    toIsError = false;
}

import {
    getBottomNavSelectedIndex,
    getSelectedItem,
    dispatchAction,
    durationToString,
    momentToDateString,
    momentToTimeString,
    momentIsInThePast,
    momentFromIsBeforeTo,
    selectedItemIsNew,
} from "../helpers";
import ItemAppBar from "./ItemAppBar";
import ItemBottomNavigation from "./ItemBottomNavigation";
import TargetPage from "./TargetPage";
import NotesPage from "./NotesPage";

let calcCurrentDuration;

export default class TopicPage extends React.Component {
    componentWillUnmount() {
        clearInterval(calcCurrentDuration);
        calcCurrentDuration = null;
        resetErrorState();
    }
    render() {
        const props = this.props;
        const getSelectedSession = () => {
            return getSelectedItem(props, "code") || { };
        }
        const getFromDate = () => {
            return momentToDateString(getSelectedSession(), "from");
        }
        const getFromTime = () => {
            return momentToTimeString(getSelectedSession(), "from");
        }
        const getToDate = () => {
            return momentToDateString(getSelectedSession(), "to");
        }
        const getToTime = () => {
            return momentToTimeString(getSelectedSession(), "to");
        }
        const canSetDateTime = (targetId, fromDateTimeString, toDateTimeString) => {
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
        }
        const selectedSessionIsRunning = () => {
            const selectedSession = getSelectedSession();
            return selectedSession.isRunning;
        }
        const handleStartSessionOnClick = (e) => {
            if (selectedSessionIsRunning()) {
                dispatchAction(props, "updateItemProperty", "isRunning", false);
                clearInterval(calcCurrentDuration);
                calcCurrentDuration = null;
            } else {
                dispatchAction(props, "updateItemProperty", "to", Date.now());
                dispatchAction(props, "updateItemProperty", "isRunning", true);
            }
        }
        const handleDateTimeOnChange = (e) => {
            const target = e.target;
            const prop = target.id;
            const newValue = target.value
            const arg = {};
            arg[prop] = newValue;
            const {
                fromDate = getFromDate(),
                fromTime = getFromTime(),
                toDate = getToDate(),
                toTime = getToTime(),
            } = arg;
            const fromDateTimeString = `${fromDate}, ${fromTime}`;
            const toDateTimeString = `${toDate}, ${toTime}`;
            if (canSetDateTime(target.id, fromDateTimeString, toDateTimeString)) {
                resetErrorState();
                switch(prop) {
                    case "fromDate":
                    case "fromTime":
                        return dispatchAction(props, "updateItemProperty", "from", Date.parse(fromDateTimeString));
                    case "toDate":
                    case "toTime":
                        return dispatchAction(props, "updateItemProperty", "to", Date.parse(toDateTimeString));
                    default:
                        return;
                }
            }
            this.forceUpdate();
        }
        const renderStartSessionIcon = () => {
            if (selectedSessionIsRunning()) {
                return (<TimerOffIcon />);
            }
            return (<TimerIcon />);
        }
        const renderToDateTime = () => {
            if (selectedSessionIsRunning()) {
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
                                value={ getToDate() }
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
                                value={ getToTime() }
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
                            onChange={ handleDateTimeOnChange }
                            label="To"
                            type="date"
                            defaultValue={ getToDate() }
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            id="toTime"
                            error={ toIsError }
                            onChange={ handleDateTimeOnChange }
                            label="To"
                            type="time"
                            defaultValue={ getToTime() }
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
            );
        }
        const renderDetailView = () => {
            const selectedIndex = getBottomNavSelectedIndex(props);
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
                                        value={ durationToString([getSelectedSession()], "long") }
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
                                        onChange={ handleDateTimeOnChange }
                                        label="From"
                                        type="date"
                                        defaultValue={ getFromDate() }
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        id="fromTime"
                                        error={ fromIsError }
                                        onChange={ handleDateTimeOnChange }
                                        label="From"
                                        type="time"
                                        defaultValue={ getFromTime() }
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            { renderToDateTime() }
                        </div>
                    );
                case 1:
                    return (
                        <div>
                            <TargetPage { ...props }/>
                        </div>
                    );
                case 2:
                    return (
                        <div>
                            <NotesPage { ...props }/>
                        </div>
                    );
                default:
                    return (
                        <div>
                            <span>blah</span>
                        </div>
                    );
            }
        }
        const renderFloatingStartSessionButton = () => {
            const selectedSession = getSelectedSession();
            if (selectedItemIsNew(props, "code") ||
                (selectedSession.to === selectedSession.from) ||
                selectedSession.isRunning) { 
                return (
                    <div className="floating-button-bottom-right">
                        <Button
                            variant="fab"
                            color="primary"
                            style={ { top: "-56px" } }
                            onClick={ handleStartSessionOnClick }>
                            { renderStartSessionIcon() }
                        </Button>
                    </div>
                ) 
            }
            return;
        }
        if (selectedSessionIsRunning() && !calcCurrentDuration) {
            calcCurrentDuration = setInterval(
                () => {
                    dispatchAction(props, "updateItemProperty", "to", Date.now());
                },
                900,
            );
        }
        return (
            <div className="pseudo-phone-main outer">
                <ItemAppBar { ...props } />
                <div className="pseudo-phone-list-no-scroll inner">
                    { renderDetailView() }
                </div>
                <div className="inner">
                    { renderFloatingStartSessionButton() }
                    <div className="bottom-nav">
                        <ItemBottomNavigation { ...props } />
                    </div>
                </div>
            </div>
        )
    }
};
