import React from "react";

import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import DeleteIcon from 'material-ui-icons/Delete';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
  },
};

class TopicListAppBar extends React.Component {
    handleOnRightIconButtonClick(e) {
    }

    render() {
        const { classes } = this.props;
        return (
            <div
                className={classes.root}>
                <AppBar
                    position="static"
                    color="primary">
                    <Toolbar>
                        <Typography
                            variant="title"
                            color="inherit"
                            className={classes.flex}
                        >
                            Topics
                        </Typography>
                        <IconButton
                            onClick={ this.handleOnRightIconButtonClick }
                            className={classes.menuButton}
                            color="inherit">
                            <DeleteIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

TopicListAppBar.propTypes = {
    classes: React.PropTypes.object.isRequired,
};

export default withStyles(styles)(TopicListAppBar);
