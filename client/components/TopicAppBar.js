import React from 'react';
import AppBar from 'material-ui/AppBar';

import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';

const TopicAppBar = React.createClass({
    render() {
        const { topicId } = this.props.params;
        const { topics } = { ...this.props };
        const i = topics.findIndex((topic) => topic.code === topicId);
        // get us the topic
        const topic = topics[i];
        return (
            <AppBar
                title={ topic.title }
                iconElementLeft={ <IconButton><NavigationArrowBack /></IconButton> }
                onLeftIconButtonClick={ () => { this.props.history.push("/") } }
                iconElementRight={ <IconButton><NavigationMoreVert /></IconButton> }
            />
        )
    }
});

export default TopicAppBar;
