import React from "react";
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFirestore, isLoaded, isEmpty } from 'react-redux-firebase'

import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
import TextField from "material-ui/TextField";

import LoadingIndicator from "./LoadingIndicator";

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
        const handleOnChange = (e, key) => {
            firestore.update(`users/${key}`, { first: e.target.value });
        }
        return (
            isLoaded(users) && !isEmpty(users)
            ? users.map((user) => {
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
            : <LoadingIndicator
                isLoaded={ isLoaded(users) }
                notLoadedText="Loading Users"
                isEmpty={ isEmpty(users) }
                isEmptyText="Users list is empty"
            />
        )
    }
}

export default compose(
  withFirestore,
  connect((state) => ({
    users: state.firestore.ordered.users
  }))
)(withStyles(styles)(TargetPage));
