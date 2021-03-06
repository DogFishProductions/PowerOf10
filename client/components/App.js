import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Main from "./Main";
import actionCreators from "../actions";

function mapStateToProps(state) {
    return {
        sessions: state.sessions,
        topics: state.topics,
        supervisor: state.supervisor,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
