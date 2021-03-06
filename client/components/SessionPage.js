import React from "react";

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import TimerIcon from 'material-ui-icons/Timer';
import TimerOffIcon from 'material-ui-icons/TimerOff';
import Grid from 'material-ui/Grid';

import { FloatingTimerButton } from "./TimerButton";

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
const clearRunningUpdater = () => {
    clearInterval(calcCurrentDuration);
    calcCurrentDuration = null;
}

export default class SessionPage extends React.Component {
    componentWillMount() {
        this.props.selectBottomNavIndex(2);
    }
    componentWillUnmount() {
        clearRunningUpdater();
        resetErrorState();
        this.props.selectBottomNavIndex(0);
    }
    render() {
        const props = this.props;
        const {
            supervisor,
            updateSessionToFrom,
            updateItemProperty,
            params,
        } = props;
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
            return _.get(supervisor, "isRunning.sessionId", 0) === selectedSession.code;
        }
        const handleDateTimeOnChange = (e) => {
            const target = e.target;
            const prop = target.id;
            const arg = {};
            arg[prop] = target.value;;
            arg[prop + "Old"] = target.defaultValue;
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
                const sessionId = _.get(params, "sessionId", -1);
                const isNew = !_.isNull(_.get(supervisor, "isNew.sessionId", null));
                switch(prop) {
                    case "fromDate":
                    case "fromTime":
                        const {
                            fromDateOld = getFromDate(),
                            fromTimeOld = getFromTime(),
                        } = arg;
                        const newFrom = Date.parse(fromDateTimeString);
                        const oldFrom = Date.parse(`${fromDateOld}, ${fromTimeOld}`);
                        updateSessionToFrom(sessionId, _.get(params, "topicId", -1), "from", newFrom, (oldFrom - newFrom), isNew);
                        return;
                    case "toDate":
                    case "toTime":
                        const {
                            toDateOld = getToDate(),
                            toTimeOld = getToTime(),
                        } = arg;
                        const newTo = Date.parse(toDateTimeString);
                        const oldTo = Date.parse(`${toDateOld}, ${toTimeOld}`);
                        updateSessionToFrom(sessionId, _.get(params, "topicId", -1), "to", newTo, (newTo - oldTo), isNew);
                        return;
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
                                        disabled={ selectedSessionIsRunning() }
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
                                        disabled={ selectedSessionIsRunning() }
                                        label="To"
                                        type="time"
                                        defaultValue={ getToTime() }
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
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
                selectedSessionIsRunning()) { 
                return (
                    <div className="floating-button-bottom-right">
                        <FloatingTimerButton { ...props } disabled={ false } />
                    </div>
                ) 
            }
            return;
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
