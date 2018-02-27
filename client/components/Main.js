import React from "react";
// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { MuiThemeProvider } from 'material-ui/styles';

import TopicListAppBar from "./TopicListAppBar";
import TopicList from "./TopicList";

// const theme = createMuiTheme();

const Main = React.createClass({
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    { React.cloneElement(this.props.children, this.props) }
                </div>
            </MuiThemeProvider>
        )
    }
})

export default Main
