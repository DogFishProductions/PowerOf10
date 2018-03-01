import React from "react";

import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import ListIcon from 'material-ui-icons/List';
import DataUsageIcon from 'material-ui-icons/DataUsage';
import DescriptionIcon from 'material-ui-icons/Description';

import * as helpers from "../helpers";

const styles = {};

const TopicBottomNavigation = React.createClass ({
    selectIndex(e, i) {
        this.props.selectBottomNavIndex(i);
    },
    render() {
        const { classes } = this.props;
        const selectedIndex = helpers.getBottomNavSelectedIndex(this.props);
        return (
            <BottomNavigation
                value={ selectedIndex }
                onChange={ this.selectIndex }
                showLabels
                className={ classes.root }>
                <BottomNavigationAction
                    label="Sessions"
                    icon={ <ListIcon /> }
                />
                <BottomNavigationAction
                    label="Target"
                    icon={ <DataUsageIcon /> }
                />
                <BottomNavigationAction
                    label="Notes"
                    icon={ <DescriptionIcon /> }
                />
            </BottomNavigation>
        );
    }
});

TopicBottomNavigation.propTypes = {
  classes: React.PropTypes.object.isRequired,
};

export default withStyles(styles)(TopicBottomNavigation);
