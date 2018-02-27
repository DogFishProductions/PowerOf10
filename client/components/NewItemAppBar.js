import React from 'react';
import AppBar from 'material-ui/AppBar';

import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

const NewItemAppBar = React.createClass({
    render() {
        const { title } = this.props;
        return (
            <AppBar
                title={ `New ${ title }` }
                iconElementLeft={ <IconButton><NavigationClose /></IconButton> }
                onLeftIconButtonClick={ () => { this.props.history.push("/") } }
                iconElementRight={<FlatButton label="Save" />}
            />
        )
    }
});

export default NewItemAppBar;
