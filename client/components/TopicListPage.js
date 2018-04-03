import React from "react";
import { compose } from 'redux'
import { withFirestore } from 'react-redux-firebase'

import AddIcon from "material-ui-icons/Add";
import Button from 'material-ui/Button';

import ItemAppBar from "./ItemAppBar";
import TopicList from "./TopicList";
import {
    randomString,
    getSelectedItemAndIndexFromArray,
    createFirestoreQueryPath,
    withLoadingIndicator,
} from "../helpers";

const TopicListComponent = (props) => {
    const {
        createItem,
        router,
        params,
        topics,
        supervisor,
    } = props;
    const {
        uid,
    } = params;
    const handleAddTopicOnClick = (e) => {
        const topicId = randomString(20, "aA#");
        const newTopic = {
            code: topicId,
            title: "New topic",
            description: "",
        }
        createItem("topic", newTopic, topicId);
        router.push(`/user/${ uid }/topic/${ topicId }`);
    }
    return (
        <div className="pseudo-phone-main outer">
            <ItemAppBar {...props} />
            <div className="pseudo-phone-list inner">
                {
                    (topics.length == 0)
                    ? <h2>
                        Add a Topic to get started
                    </h2>
                    : <div>
                        <TopicList {...props} />
                    </div>
                }
            </div>
            <div className="inner">
                <div className="floating-button-bottom-right">
                    <Button
                        variant="fab"
                        color="primary"
                        onClick={ handleAddTopicOnClick }>
                        <AddIcon />
                    </Button>
                </div>
            </div>
        </div>
    )
}

const EnhancedTopicListWithLoadingIndicator = withLoadingIndicator(TopicListComponent);

class TopicListPage extends React.Component {
    componentWillMount() {
        this.props.firestore.get(createFirestoreQueryPath(this.props.params.uid, true));
    }
    render() {
        const props = this.props;
        return (
            <EnhancedTopicListWithLoadingIndicator
                { ...props }
                isLoading={ !(props.supervisor.isLoaded || false) }
                loadingMessage="Loading Topics"
            />
        )
    }
}

export default compose(
  withFirestore,
)(TopicListPage);
