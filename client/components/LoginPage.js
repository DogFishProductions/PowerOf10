import PropTypes from 'prop-types';
import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import GoogleButton from "react-google-button";

import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import { CircularProgress } from 'material-ui/Progress';

import {
    withLoadingIndicator,
} from "../helpers";

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
        textAlign: "center",
    },
});

const authenticate = (e, firebase, provider) => {
    firebase.login({ provider, type: "redirect" }).catch(console.log);
}

const LoginButton = ({ firebase, auth }) => {
    return (
        isEmpty(auth)
        ? <GoogleButton
            style={ { margin: "0 auto" } }
            onClick={ (e) => authenticate(e, firebase, "google")}
        />
        : <Button
            variant="raised"
            color="primary"
            onClick={ (e) => firebase.logout() }
        >
            Log out
        </Button>
    )
}

const LoginButtonWithLoadingIndicator = withLoadingIndicator(LoginButton);

const LoginPage = (props) =>  {
    const {
        classes,
        firebase,
        auth,
    } = props;
    return (
        <div
            className={ `${ classes.root } pseudo-phone-list-no-scroll` }
        >
            <Grid
                container
                className={ classes.flex }
            >
                <Grid
                    item
                    xs={ 12 }
                >
                    <h2>Experience the Power of 10</h2>
                </Grid>
                {
                    <LoginButtonWithLoadingIndicator
                        { ...props }
                        isLoading={ !isLoaded(auth) }
                        loadingMessage="Loading user details"
                    />
                }
            </Grid>
        </div>
    );
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
    firebase: PropTypes.shape({
        login: PropTypes.func.isRequired,
    }),
    auth: PropTypes.object,
};

export default compose(
    firebaseConnect(),
    connect(({ firebase: { auth } }) => ({ auth }))
)(withStyles(styles)(LoginPage));
