import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Main from "./Main";
import * as actionCreators from "../actions/actionCreators";

function mapStateToProps(state) {
    return {
        sessions: state.sessions,
        topics: state.topics,
        navigation: state.navigation
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
