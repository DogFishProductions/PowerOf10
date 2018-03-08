import React from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Typography from "material-ui/Typography";
import Checkbox from 'material-ui/Checkbox';
import { FormGroup, FormControlLabel } from 'material-ui/Form';

import dispatchAction from "../helpers";

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {},
    flex: {
        flex: 1,
    },
    drawerPaper: {
        width: "360px",
        marginTop: "56px",
        backgroundColor: "white"
    },
    checkbox: {
        marginLeft: "16px",
    },
});

class TopDrawer extends React.Component {
    render() {
        const {
            classes,
            supervisor,
        } = this.props;

        const handleCheckboxOnClick = (e) => {
            if (e.target.checked) {
                this.props.selectAllForDeletion("session", this.props.sessions, this.props.params.topicId);
            } else {
                this.props.deselectAllForDeletion();
            }
        };

        const drawerOptions = (
            <FormGroup> 
                <FormControlLabel
                    control={
                        <Checkbox
                            className={ classes.checkbox }
                            onChange={ handleCheckboxOnClick }
                        />
                    }
                    label="Select All"
                />
            </FormGroup>
        );

        return (
            <Drawer
                classes={{
                    paper: classes.drawerPaper,
                }}
                variant="persistent"
                anchor="top"
                open={ supervisor.displaySelectForDeletion }
            >
                { drawerOptions }
            </Drawer>
        );
    }
}

TopDrawer.propTypes = {
  classes: React.PropTypes.object.isRequired,
};

export default withStyles(styles)(TopDrawer);
