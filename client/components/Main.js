import React from "react";

import Reboot from "material-ui/Reboot";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import pink from 'material-ui/colors/pink';
import orange from 'material-ui/colors/orange';

import base from "../base";

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
                <Reboot>
                    <MuiThemeProvider theme={ theme }>
                        <div>
                            { React.cloneElement(this.props.children, this.props) }
                        </div>
                    </MuiThemeProvider>
                </Reboot>
            </div>
        );
    }
}
