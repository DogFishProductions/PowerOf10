import PropTypes from 'prop-types';
import React from "react";

import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import ListIcon from 'material-ui-icons/List';
import DataUsageIcon from 'material-ui-icons/DataUsage';
import DescriptionIcon from 'material-ui-icons/Description';
import TimelapseIcon from 'material-ui-icons/Timelapse';

import * as helpers from "../helpers";

const styles = theme => ({
    root: {
        background: "#EEEEEE"
    }
});

class ItemBottomNavigation extends React.Component {
    render() {
        const props = this.props;
        const {
            classes,
            params,
        } = props;
        const {
            topicId,
            sessionId
        } = params;
        const selectIndex = (e, i) => {
            props.selectBottomNavIndex(i);
        }
        const renderLeftIcon = () => {
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
        }
        const selectedIndex = helpers.getBottomNavSelectedIndex(props);
        return (
            <BottomNavigation
                value={ selectedIndex }
                onChange={ selectIndex }
                showLabels
                className={ classes.root }>
                { renderLeftIcon() }
                <BottomNavigationAction
                    disabled={ true }
                    label="Target"
                    icon={ <DataUsageIcon color="disabled" /> }
                />
                <BottomNavigationAction
                    label="Notes"
                    icon={ <DescriptionIcon /> }
                />
            </BottomNavigation>
        );
    }
}

ItemBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemBottomNavigation);
