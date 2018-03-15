import React from "react";
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFirestore, isLoaded, isEmpty, firestoreConnect } from 'react-redux-firebase'

import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import { CircularProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
        textAlign: "center",
    },
});

class TargetPage extends React.Component {
    componentWillMount() {
        this.props.firestore.get("users/A0vdSBqTPAfGVNuNKAjR");
    }
    render() {
        const {
            classes,
            users,
            firestore,
        } = this.props;
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
                        <h2>Loading users</h2>
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
        const handleOnChange = (e, key) => {
            firestore.update(`users/${key}`, { first: e.target.value });
        }
        return(
            <div>
                {
                    !isLoaded(users)
                        ? renderLoadingProgress()
                        : isEmpty(users)
                            ? 'Users list is empty'
                            : users.map((user) => {
                                return (
                                    <div key={ user.id }>
                                        <TextField
                                            placeholder="Describe your new topic"
                                            label="Description"
                                            multiline
                                            rows="2"
                                            rowsMax="15"
                                            onChange={ (e) => handleOnChange(e, user.id) }
                                            defaultValue={ user.first }
                                        />
                                    </div>
                                );
                            })
                }
            </div>
        )
    }
}

export default compose(
  withFirestore,
  connect((state) => ({
    users: state.firestore.ordered.users
  }))
)(withStyles(styles)(TargetPage));
