import React from "react";

import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import pink from 'material-ui/colors/pink';
import orange from 'material-ui/colors/orange';

const theme = createMuiTheme({
    palette: {
        primary: pink,
        secondary: orange,
    },
    overrides: {
        MuiBottomNavigation: {
            root: {
                background: orange,
            },
        },
    }
});

export default class Main extends React.Component {
    componentWillMount() {
        // this.ref = base.syncState()
    }
    componentWillUnmount() {

    }
    render() {
        return (
            <div>
                <MuiThemeProvider theme={ theme }>
                    <CssBaseline />
                    <div>
                        { React.cloneElement(this.props.children, this.props) }
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
