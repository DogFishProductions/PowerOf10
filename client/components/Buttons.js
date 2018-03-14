import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import TimerIcon from 'material-ui-icons/Timer';
import TimerOffIcon from 'material-ui-icons/TimerOff';
import CloseIcon from 'material-ui-icons/Close';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import MoreVertIcon from 'material-ui-icons/MoreVert';

const styles = {
    timer: {
        fontSize: 30
    }
}

// Icon buttons
const iconTimerButton = (props) => {
    const { classes } = props;
    return (
        <IconButton
            className={classes.button}
        >
            <TimerIcon
                className={classes.timer}
            />
        </IconButton>
    );
}

iconTimerButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export const IconTimerButton = withStyles(styles)(iconTimerButton);

const iconTimerOffButton = (props) => {
    const { classes } = props;
    return (
        <IconButton
            className={classes.button}
        >
            <TimerOffIcon
                className={classes.timer}
            />
        </IconButton>
    );
}

iconTimerOffButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export const IconTimerOffButton = withStyles(styles)(iconTimerOffButton);

// Floating buttons
const floatingAddButton = (props) => {
    const { classes } = props;
    return (
        <Button variant="fab" color="primary" className={classes.button}>
            <AddIcon />
        </Button>
    );
}

floatingAddButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export const FloatingAddButton = withStyles(styles)(floatingAddButton);