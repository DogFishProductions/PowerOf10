import React from "react";

import AddIcon from "material-ui-icons/Add";
import Button from 'material-ui/Button';

import * as helpers from "../helpers";
// import TopicListAppBar from "./TopicListAppBar";
import ItemAppBar from "./ItemAppBar";
import TopicList from "./TopicList";

export default class TopicListPage extends React.Component {
    render() {
        const props = this.props;
        const {
            createItem,
            router,
            params,
        } = props;
        const {
            uid,
        } = params;
        const handleAddTopicOnClick = (e) => {
            const topicId = helpers.randomString(10, "aA#!");
            createItem("topic", topicId);
            router.push(`/${ uid }/topic/${ topicId }`);
        }
        return (
            <div className="pseudo-phone-main outer">
                <ItemAppBar {...props} />
                <div className="pseudo-phone-list inner">
                    <div>
                        <TopicList {...props} />
                    </div>
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
}
