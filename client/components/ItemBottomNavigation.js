import React from "react";

import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import ListIcon from 'material-ui-icons/List';
import DataUsageIcon from 'material-ui-icons/DataUsage';
import DescriptionIcon from 'material-ui-icons/Description';
import TimelapseIcon from 'material-ui-icons/Timelapse';

import * as helpers from "../helpers";

const styles = {};

const ItemBottomNavigation = React.createClass ({
    selectIndex(e, i) {
        this.props.selectBottomNavIndex(i);
    },
    renderLeftIcon() {
        const {
            topicId,
            sessionId
        } = this.props.params;
        if (topicId && !sessionId) {
            return (
                <BottomNavigationAction
                    label="Sessions"
                    icon={ <ListIcon /> }
                />
            );
        } else {
            return (
                <BottomNavigationAction
                    label="Duration"
                    icon={ <TimelapseIcon /> }
                />
            );
        }
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
                { this.renderLeftIcon() }
                <BottomNavigationAction
                    disabled={ true }
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

ItemBottomNavigation.propTypes = {
  classes: React.PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemBottomNavigation);
