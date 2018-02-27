import React, { Component } from "react";

import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconList from 'material-ui/svg-icons/action/list';
import IconDescription from 'material-ui/svg-icons/action/description';
import IconDataUsage from 'material-ui/svg-icons/device/data-usage';

import * as helpers from "../helpers";

const TopicBottomNavigation = React.createClass({
    selectIndex(i) {
        this.props.selectBottomNavIndex(i);
    },
    render() {
        const selectedIndex = helpers.getBottomNavSelectedIndex(this.props);
        return (
            <Paper zDepth={1}>
                <BottomNavigation selectedIndex={ selectedIndex }>
                    <BottomNavigationItem
                        label="Sessions"
                        icon={ <IconList /> }
                        onClick={ () => this.selectIndex(0) }
                    />
                    <BottomNavigationItem
                        label="Target"
                        icon={ <IconDataUsage /> }
                        onClick={ () => this.selectIndex(1) }
                    />
                    <BottomNavigationItem
                        label="Notes"
                        icon={ <IconDescription /> }
                        onClick={ () => this.selectIndex(2) }
                    />
                </BottomNavigation>
            </Paper>
    );
  }
});

export default TopicBottomNavigation;
