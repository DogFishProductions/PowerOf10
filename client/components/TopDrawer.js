import PropTypes from 'prop-types';
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
        const props = this.props;
        const {
            classes,
            supervisor,
            params,
            selectAllForDeletion,
            deselectAllForDeletion,
            sessions,
            topics,
        } = this.props;
        const {
            topicId,
            sessionId,
        } = params;
        const handleCheckboxOnClick = (e) => {
            if (e.target.checked) {
                if (params.topicId) {
                    selectAllForDeletion("session", sessions, topicId);
                } else {
                    selectAllForDeletion("topic", topics);
                }
            } else {
                deselectAllForDeletion();
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
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopDrawer);
