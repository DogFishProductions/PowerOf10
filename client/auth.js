import locationHelperBuilder from 'redux-auth-wrapper/history3/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history3/redirect'
import { routerActions } from 'react-router-redux'

import * as _ from "lodash";

import LoginPage from './components/LoginPage'

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
    redirectPath: '/login',
    authenticatingSelector: ({ firebase: { auth, isInitializing } }) => !auth.isLoaded || isInitializing === true,
    authenticatedSelector: ({ firebase: { auth } }) => auth.isLoaded && !auth.isEmpty,
    AuthenticatingComponent: LoginPage,
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'UserIsAuthenticated'
});

export const userIsAuthorised = connectedRouterRedirect({
    redirectPath: '/',
    allowRedirectBack: false,
    authenticatedSelector: state => {
        const pathname = _.get(state, "routing.locationBeforeTransitions.pathname", "");
        const uid = _.get(state, "firebase.auth.uid", "unauthorised");
        return pathname.indexOf(uid) > 0;
    },
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'UserIsAuthorised'
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    redirectPath: (state, ownProps) => {
        const uid = _.get(state, "firebase.auth.uid", null);
        return uid ? `/user/${uid}` : '/';
    },
    allowRedirectBack: false,
    authenticatingSelector: ({ firebase: { auth, isInitializing } }) => !auth.isLoaded || isInitializing === true,
    AuthenticatingComponent: LoginPage,
    // Want to redirect the user when they are done loading and authenticated
    authenticatedSelector: ({ firebase: { auth } }) => auth.isLoaded && auth.isEmpty,
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'UserIsNotAuthenticated'
});
