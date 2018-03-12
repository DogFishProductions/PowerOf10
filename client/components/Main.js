import React from "react";

import Reboot from "material-ui/Reboot";
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

const Main = (props) => {
    return (
        <div>
            <Reboot>
                <MuiThemeProvider theme={ theme }>
                    <div>
                        { React.cloneElement(props.children, props) }
                    </div>
                </MuiThemeProvider>
            </Reboot>
        </div>
    )
}

export default Main
