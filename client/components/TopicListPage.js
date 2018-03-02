import React from "react";

import AddIcon from "material-ui-icons/Add";
import Button from 'material-ui/Button';

import * as helpers from "../helpers";
import TopicListAppBar from "./TopicListAppBar";
import TopicList from "./TopicList";

const TopicListPage = React.createClass({
    handleAddTopicOnClick(e) {
        const topicId = helpers.randomString(10, "aA#!");
        this.props.createItem("topic", topicId);
        this.props.history.push(`/topic/${ topicId }`);
    },
    render() {
        return (
            <div className="pseudo-phone-main outer">
                <TopicListAppBar />
                <div className="pseudo-phone-list inner">
                    <div>
                        <TopicList {...this.props} />
                    </div>
                </div>
                <div className="inner">
                    <div className="floating-button-bottom-right">
                        <Button
                            variant="fab"
                            color="primary"
                            onClick={ this.handleAddTopicOnClick }>
                            <AddIcon />
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
})


export default TopicListPage;
