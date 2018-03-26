import React from "react";
import PropTypes from 'prop-types';

import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
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
        isLoaded,
        notLoadedText,
        isEmpty,
        isEmptyText,
    } = props;
    const renderLoadingProgress = () => {
        return (
            <Grid
                container
                className={ classes.flex }
            >
                <Grid
                    item
                    xs={ 12 }
                >
                    <h2>{ notLoadedText }</h2>
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
    return (
        isLoaded
        ? isEmpty && (<h2>{ isEmptyText }</h2>)
        : renderLoadingProgress()
    )
}

LoadingIndicator.propTypes = {
    classes: PropTypes.object.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    notLoadedText: PropTypes.string.isRequired,
    isEmpty: PropTypes.bool.isRequired,
    isEmptyText: PropTypes.string.isRequired,
};

export default (withStyles(styles)(LoadingIndicator));
