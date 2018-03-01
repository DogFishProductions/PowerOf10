import React from "react";

import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const TopicListAppBar = (props) => {
    const { classes } = props;
    return (
        <div
            className={classes.root}>
            <AppBar
                position="static"
                color="primary">
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="title"
                        color="inherit">
                        Topics
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

TopicListAppBar.propTypes = {
    classes: React.PropTypes.object.isRequired,
};

export default withStyles(styles)(TopicListAppBar);
