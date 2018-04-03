import React from "react";
import PropTypes from 'prop-types';

import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import { CircularProgress } from 'material-ui/Progress';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
        textAlign: "center",
    },
});

const LoadingIndicator = (props) => {
    const {
        classes,
        loadingMessage,
    } = props;
    return (
        <Grid
            container
            className={ classes.flex }
        >
            <Grid
                item
                xs={ 12 }
            >
                <h2>{ loadingMessage }</h2>
            </Grid>
            <Grid
                item
                xs={ 12 }
            >
                <CircularProgress
                    color="secondary"
                />
            </Grid>
        </Grid>
    )
}

LoadingIndicator.propTypes = {
    classes: PropTypes.object.isRequired,
    loadingMessage: PropTypes.string.isRequired,
};

export default (withStyles(styles)(LoadingIndicator));
