import React from "react";

import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Menu, { MenuItem } from 'material-ui/Menu';

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
    render() {
        const {
            classes,
            supervisor,
        } = this.props;

        const handleOnRightIconButtonClick = (e) => {
            this.props.openMenu(false);
        }

        const handleMenuButtonOnClick = (e) => {
            this.props.openMenu(true, e.currentTarget);
        }
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
                            className={ classes.menuButton }
                            onClick={ handleMenuButtonOnClick }
                            color="inherit">
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={ supervisor.menuAnchor }
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={ Boolean(supervisor.menuAnchor) }
                            >
                            <MenuItem
                                onClick={ handleOnRightIconButtonClick }
                            >
                                No Actions Available
                            </MenuItem>
                        </Menu>
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
