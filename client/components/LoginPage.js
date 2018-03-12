import React from "react";
import firebase from "firebase";

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
    componentWillMount() {
        firebase.auth().getRedirectResult()
            .then((result) => {
                if (result.credential) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const token = result.credential.accessToken;
                    // ...
                }
                // The signed-in user info.
                const user = result.user || {};
                this.props.setAuthorisedUserId(user.uid);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                const credential = error.credential;
                // ...
            });
    }
    render() {
        console.log("rendering")
        const props = this.props;
        const {
            classes,
            supervisor,
            history,
            showProgress
        } = props;
        const authenticate = (e, providerName) => {
            let provider;
            switch(providerName) {
                case "google":
                default:
                    provider = new firebase.auth.GoogleAuthProvider();
            }
            firebase.auth().signInWithRedirect(provider);
            showProgress(true);
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
                            <h2>Login to experience the Power of 10</h2>
                        </Grid>
                        <Grid
                            item
                            xs={ 12 }
                        >
                            <Button
                                variant="raised"
                                color="primary"
                                onClick={ (e) => authenticate(e, "google")}
                            >
                                Log in with Google
                            </Button>
                        </Grid>
                        { supervisor.showProgress &&
                            <Grid
                                item
                                xs={12}
                            >
                                <CircularProgress color="secondary" />
                            </Grid>
                        }
                        
                    </Grid>
                </div>
            );
        }
        // check if user is not logged in at all
        console.log("supervisor: ", supervisor);
        if (!supervisor.authorisedUserId) {
            return renderLogin();
        } else {
            history.push(`/user/${ supervisor.authorisedUserId }`);
            return renderLogin();
        }
    }
};

LoginPage.propTypes = {
    classes: React.PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);
