import React from "react";
import { compose } from 'redux'
import { withFirestore } from 'react-redux-firebase'

import AddIcon from "material-ui-icons/Add";
import Button from 'material-ui/Button';

import * as helpers from "../helpers";
import ItemAppBar from "./ItemAppBar";
import TopicList from "./TopicList";
import LoadingIndicator from "./LoadingIndicator";
import {
    getSelectedItemAndIndexFromArray,
} from "../helpers";

class TopicListPage extends React.Component {
    componentWillMount() {
        this.props.firestore.get({
            collection: "users",
            doc: this.props.params.uid,
            subcollections: [
                {
                    collection: "topics",
                },
            ],
        });
    }
    render() {
        const props = this.props;
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
            const topicId = helpers.randomString(20, "aA#");
            createItem("topic", topicId);
            router.push(`/user/${ uid }/topic/${ topicId }`);
        }
        const isLoaded = (supervisor.isLoaded || false);
        const isEmpty = (topics.length == 0);
        return (
            isLoaded
            ? <div className="pseudo-phone-main outer">
                <ItemAppBar {...props} />
                <div className="pseudo-phone-list inner">
                    {
                        isEmpty
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
            : <LoadingIndicator
                isLoaded={ isLoaded }
                notLoadedText="Loading Topics"
                isEmpty={ isEmpty }
                isEmptyText="Add a Topic to get started"
            />
        )
    }
}

export default compose(
  withFirestore,
)(TopicListPage);
