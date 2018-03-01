// import React from 'react';
// import * as moment from 'moment';

// import { List, ListItem } from 'material-ui/List';
// import { red500 } from 'material-ui/styles/colors';
// import Divider from 'material-ui/Divider';
// // import FlatButton from 'material-ui/FlatButton';
// import ImageTimer from 'material-ui/svg-icons/image/timer';
// import ImageTimerOff from 'material-ui/svg-icons/image/timer-off';
// import Subheader from 'material-ui/Subheader';
// import Checkbox from 'material-ui/Checkbox';

// import { durationToString, durationToHumanizedString, getTopicSessions } from "../helpers";

// const flatButtonStyle = {
//     textAlign: "right",
//     fontSize: "14px",
//     paddingRight: "8px" 
// }

// const subheaderStyle = {
//     position: "absolute",
//     top: "80px",
//     left: "0px"
// }

// const SessionList = React.createClass({
//     renderSessionDuration(session) {
//         return (
//             // <FlatButton
//                 // disabled={ true }
//                 // style={ flatButtonStyle }
//             // >
//                 { durationToString([session]) }
//             // </FlatButton>
//         );
//     },
//     renderSession(session, i) {
//         return (
//             <div key={i}>
//                 <ListItem
//                     leftCheckbox={ <Checkbox /> }
//                     insetChildren={ true }
//                     rightIconButton={ this.renderSessionDuration(session) }
//                     primaryText={ session.description }
//                     secondaryText={ durationToHumanizedString([session]) }
//                 />
//                 <Divider />
//             </div>
//         );
//     },
//     renderListItems(defaultText = "Start recording sessions") {
//         const currentSessions = getTopicSessions(this.props);
//         if (currentSessions.length > 0) {
//             return (
//                 <div>
//                     <Subheader style={ subheaderStyle }>Sessions</Subheader>
//                     <List className="sessionList">
//                         { currentSessions.map(this.renderSession)}
//                     </List>
//                 </div>
//             );
//         } else {
//             return (
//                 <List>
//                     <Subheader>Sessions</Subheader>
//                     { defaultText }
//                 </List>
//             );
//         }
//     },
//     render() {
//         return this.renderListItems(this.props.defaultText);
//     }
// });

// export default SessionList;