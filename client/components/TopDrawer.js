import React from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from "material-ui/Typography";
import Checkbox from 'material-ui/Checkbox';

import dispatchAction from "../helpers";

const styles = {
    root: {
      flexGrow: 1,
      menuButton: {
          color: "primary"
      }
    },
    flex: {
        flex: 1,
    },
    drawerPaper: {
        width: "360px",
        marginTop: "56px"
    },
    myTypo: {
        margin: "8px 16px",
        color: "black",
        float: "right"
    },
    checkbox: {
        float: "right"
    }
};

class TopDrawer extends React.Component {
  render() {
    const {
        classes,
        supervisor,
    } = this.props;

    const handleCheckboxOnClick = (e) => {

    };

    const drawerOptions = (
        <div>
            <Typography
                className={ classes.myTypo }
                color="inherit"
            >
                    Select All
            </Typography>
            <Checkbox
                className={ classes.checkbox }
                checked={ true }
                onChange={ handleCheckboxOnClick }
            />
        </div>
    );

    return (
      <div>
        <Drawer
            classes={{
                paper: classes.drawerPaper,
            }}
            variant="persistent"
            anchor="top"
            open={ supervisor.selectForDeletion }
        >
          <div
            tabIndex={0}
            role="button"
          >
            { drawerOptions }
          </div>
        </Drawer>
      </div>
    );
  }
}

TopDrawer.propTypes = {
  classes: React.PropTypes.object.isRequired,
};

export default withStyles(styles)(TopDrawer);
