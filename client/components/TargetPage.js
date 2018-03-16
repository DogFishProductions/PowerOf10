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
        this.props.firestore.get({
            collection: "users",
            doc: this.props.params.uid,
            subcollections: [
                {
                    collection: "topics",
                },
            ],
        });
    }
    render() {
        console.log(this.props.user);
        const {
            classes,
            user,
            firestore,
        } = this.props;
        const handleOnChange = (e, key) => {
            firestore.update(`users/${key}`, { first: e.target.value });
        }
        return (
            isLoaded(user) && !isEmpty(user)
            ? <TextField
                placeholder="Describe your new topic"
                label="Description"
                multiline
                rows="2"
                rowsMax="15"
                onChange={ (e) => handleOnChange(e, i) }
                defaultValue="test"
            />
            : <LoadingIndicator
                isLoaded={ isLoaded(user) }
                notLoadedText="Loading Users"
                isEmpty={ isEmpty(user) }
                isEmptyText="Users list is empty"
            />
        )
    }
}

export default compose(
  withFirestore,
  connect((state, props) => ({
    user: state.firestore.data.users,
  }))
)(withStyles(styles)(TargetPage));
