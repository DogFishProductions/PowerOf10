import React from "react";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import base from "../base";

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
        } = props;
        const authenticate = (e, provider) => {
            base.AuthWithOAuthPopup(provider, authHandler);
        }
        const authHandler = (err, authData) => {
            console.log(authData);
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
                    </Grid>
                </div>
            );
        }
        // check if user is not logged in at all
        if (!supervisor.uid) {
            return renderLogin();
        }
        return renderLogin();
    }
};

LoginPage.propTypes = {
    classes: React.PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);
