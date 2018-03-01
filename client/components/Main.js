import React from "react";

import Reboot from "material-ui/Reboot";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import pink from 'material-ui/colors/pink';

const theme = createMuiTheme({
    palette: {
        primary: pink,
    },
});

const Main = React.createClass({
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
        )
    }
})

export default Main
