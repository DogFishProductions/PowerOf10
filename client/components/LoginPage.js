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

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
        textAlign: "center",
    },
});

class LoginPage extends React.Component {
    render() {
        const props = this.props;
        const {
            classes,
            supervisor,
            router,
            showProgress,
            setAuthorisedUserId,
            firebase,
            auth,
        } = props;
        const authenticate = (e, provider) => {
            firebase.login({ provider, type: "redirect" }).catch(console.log);
        }
        const renderLogin = () => {
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
                            <Grid
                                item
                                xs={ 12 }
                            >
                                { isLoaded(auth)
                                    ? (isEmpty(auth) &&
                                        <GoogleButton
                                            style={ { margin: "0 auto" } }
                                            onClick={ (e) => authenticate(e, "google")}
                                        >
                                            Log in with Google
                                        </GoogleButton>
                                    )
                                    : <CircularProgress
                                        color="secondary"
                                        disabled={ !supervisor.showProgress }
                                    />
                                }
                            </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            { !isEmpty(auth) &&
                                <Button
                                    variant="raised"
                                    color="primary"
                                    onClick={ (e) => firebase.logout() }
                                >
                                    Log out
                                </Button>
                            }
                        </Grid>
                    </Grid>
                </div>
            );
        }
        return renderLogin();
    }
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
