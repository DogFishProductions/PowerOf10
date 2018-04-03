import React from "react";
import { compose } from 'redux'
import { withFirestore } from 'react-redux-firebase'
import * as _ from "lodash";

import TextField from 'material-ui/TextField';
import TimerIcon from 'material-ui-icons/Timer';
import TimerOffIcon from 'material-ui-icons/TimerOff';
import AddIcon from "material-ui-icons/Add";
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import {
    createFirestoreQueryPath,
    getBottomNavSelectedIndex,
    getSelectedItem,
    durationToString,
    getTopicSessions,
    getNewSession,
    withLoadingIndicator,
} from "../helpers";
import ItemAppBar from "./ItemAppBar";
import ItemBottomNavigation from "./ItemBottomNavigation";
import SessionList from "./SessionList";
import TargetPage from "./TargetPage";
import NotesPage from "./NotesPage";
import { FloatingTimerButton } from "./TimerButton";

const gridStyle = {
    flexGrow: "1",
    margin: "8px 16px 0px 16px",
    width: "328px",
}
const bottomGridStyle = {
    ...gridStyle,
    margin: "8px 0px 56px 0px",
    overflow: "auto",
    width: "360px",
    maxHeight: "416px"
}

const TopicComponent = ({ topicIsNew, ...props }) => {
    const selectedIndex = getBottomNavSelectedIndex(props);
    const defaultSessionListText = (topicIsNew) ? "Save topic to start recording sessions" : "Start recording sessions";
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
                                label="Total Time Spent"
                                disabled={ true }
                                fullWidth={ true }
                                value={ durationToString(getTopicSessions(props), "long") }
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={ 24 }
                        style={ bottomGridStyle }
                    >
                        <Grid item xs>
                            <SessionList { ...props } defaultText={ defaultSessionListText }/>
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
                    <SessionList { ...props } defaultText={ defaultSessionListText }/>
                </div>
            );
    }
}

const EnhancedTopicWithLoadingIndicator = withLoadingIndicator(TopicComponent);

class TopicPage extends React.Component {
    componentWillMount() {
        const {
            supervisor,
            firestore,
            params,
        } = this.props;
        const {
            uid,
            topicId,
        } = params;
        if (_.get(supervisor, "isNew.topicId", -1) != topicId) {
            firestore.get(createFirestoreQueryPath(uid, true, topicId, true));
        }
    }
    componentWillUnmount() {
        this.props.selectBottomNavIndex(0);
    }
    render() {
        const props = this.props;
        const {
            supervisor,
            router,
            editItemTitle,
            params,
            selectBottomNavIndex,
        } = props;
        const {
            uid,
            topicId,
        } = params;
        const topicIsNew = supervisor.isNew.topicId === topicId;
        const handleAddSessionOnClick = (e) => {
            const sessionId = _.get(getNewSession(props), "code", -1);
            selectBottomNavIndex(0);
            router.push(`/user/${ uid }/topic/${ topicId }/session/${ sessionId }`);
        }
        const handleDivOnClick = (e) => {
            editItemTitle(false);
        }
        const isLoaded = (supervisor.isLoaded || false);
        return (
            <div className="pseudo-phone-main outer">
                <ItemAppBar { ...props } />
                <div className="pseudo-phone-list-no-scroll inner" onClick={ handleDivOnClick }>
                    <EnhancedTopicWithLoadingIndicator
                        { ...props }
                        topicIsNew={ topicIsNew }
                        isLoading={ !isLoaded }
                        loadingMessage="Loading Topic"
                    />
                </div>
                <div className="inner">
                    <div className="floating-button-bottom-right">
                        <Button
                            disabled={ !isLoaded || topicIsNew }
                            variant="fab"
                            color="primary"
                            style={ { top: "-128px" } }
                            onClick={ handleAddSessionOnClick }>
                            <AddIcon />
                        </Button>
                    </div>
                    <div className="floating-button-bottom-right">
                        <FloatingTimerButton { ...props } disabled={ !isLoaded || topicIsNew } />
                    </div>
                    <div className="bottom-nav" onClick={ handleDivOnClick }>
                        <ItemBottomNavigation { ...props } />
                    </div>
                </div>
            </div>
        )
    }
};

export default compose(
  withFirestore,
)(TopicPage);

