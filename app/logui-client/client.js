import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import HeaderPageComponent from './common/header';
import TrailPageComponent from './nav/trail/trail';
import MenuPageComponent from './nav/menu/menu';

import LandingPage, {Submenu as LandingPageSubmenu} from './common/landing';
import ApplicationsLandingPage from './applications/landing';
import ApplicationsNewPage from './applications/new';

import FlightsLandingPage from './flight/landing';

import SettingsLandingPage from './settings/landing';

import UserLandingPage from './user/landing';
import UserLoginPage from './user/login';
import UserLogoutPage from './user/logout';

import LoadingSplash from './common/loadingSplash';
import NotFoundPage from './common/notFound';
import AboutPage from './common/about';

import Constants from './constants';

class LogUIClientApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hideSplashScreen: false,
            currentMenuComponent: null,
            currentTrail: null,
            isLoggedIn: false,
            loginDetails: null,
            landingMessage: null,
        };

        this.setMenuComponent = this.setMenuComponent.bind(this);
        this.setTrailComponent = this.setTrailComponent.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.setLoginDetails = this.setLoginDetails.bind(this);
        this.getLoginDetails = this.getLoginDetails.bind(this);
        this.getLoginToken = this.getLoginToken.bind(this);
        this.setLandingMessage = this.setLandingMessage.bind(this);
        this.clearLandingMessage = this.clearLandingMessage.bind(this);

        this.methodReferences = {
            setMenuComponent: this.setMenuComponent,
            setTrailComponent: this.setTrailComponent,
            getLoginDetails: this.getLoginDetails,
            login: this.login,
            logout: this.logout,
            setLandingMessage: this.setLandingMessage,
            clearLandingMessage: this.clearLandingMessage,
        }
    }

    setMenuComponent(component) {
        this.setState({
            currentMenuComponent: component
        });
    }

    setTrailComponent(trailArray) {
        this.setState({
            currentTrail: trailArray
        })
    }

    async login(username, password) {
        try {
            var response = await fetch(`${Constants.SERVER_API_ROOT}user/auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
        }
        catch (err) {
            console.error("Something went wrong with communicating with the server.");
        }

        var responseJSON = null;
        await response.json().then(data => responseJSON = data);

        if (response.status != 200) {
            return {
                loginSuccess: false
            }
        }

        this.setLoginDetails(responseJSON.token, responseJSON.user);

        this.setState({
            isLoggedIn: true,
        });

        return {
            loginSuccess: true
        }
    }

    logout() {
        this.setState({
            isLoggedIn: false,
            loginDetails: null,
        });

        this.setLandingMessage(1);

        window.sessionStorage.removeItem(Constants.SESSIONSTORAGE_AUTH_TOKEN);
    }

    getLoginDetails() {
        return {
            token: window.sessionStorage.getItem(Constants.SESSIONSTORAGE_AUTH_TOKEN),
            user: this.state.loginDetails,
        }
    }

    async getLoginToken() {
        let token = window.sessionStorage.getItem(Constants.SESSIONSTORAGE_AUTH_TOKEN);

        if (token) {
            var response = await fetch(`${Constants.SERVER_API_ROOT}user/current/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `jwt ${token}`
                },
            });

            response.json().then(data => {
                if (response.status == 200) {
                    this.setState({
                        isLoggedIn: true,
                        loginDetails: data,
                    });
                }
            });         
        }
    }

    setLoginDetails(token, userObject) {
        this.setState({
            loginDetails: userObject
        });

        this.setLandingMessage(2);

        window.sessionStorage.setItem(Constants.SESSIONSTORAGE_AUTH_TOKEN, token);
    }

    componentDidMount() {
        this.getLoginToken();
        
        setTimeout(
            () => {
                this.setState({
                    hideSplashScreen: true
                })
            },
            Constants.SPLASH_PERSIST_DELAY
        );
    }

    setLandingMessage(messageID) {
        this.setState({
            landingMessage: messageID,
        });
    }

    clearLandingMessage() {
        this.setState({
            landingMessage: null,
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.landingMessage && nextState && !nextState.landingMessage) {
            return false;
        }

        return true;
    }

    render() {
        return(
            <Router>
                <LoadingSplash hideSplashScreen={this.state.hideSplashScreen} />
                <HeaderPageComponent />
                <TrailPageComponent currentTrail={this.state.currentTrail} />
                <MenuPageComponent currentMenuComponent={this.state.currentMenuComponent} clientMethods={this.methodReferences} isLoggedIn={this.state.isLoggedIn} />
                
                <Switch>
                    <Route
                        path="/"
                        exact
                        replace
                        render={
                            (props) => (<LandingPage {...props} clientMethods={this.methodReferences} isLoggedIn={this.state.isLoggedIn} landingMessage={this.state.landingMessage} />)}
                    />
                    
                    <Route
                        path="/applications"
                        exact
                        replace
                        render={
                            (props) => (<ApplicationsLandingPage {...props} clientMethods={this.methodReferences} isLoggedIn={this.state.isLoggedIn} />)}
                    />
                    
                    <Route
                        path="/applications/new"
                        exact
                        replace
                        render={
                            (props) => (<ApplicationsNewPage {...props} clientMethods={this.methodReferences} isLoggedIn={this.state.isLoggedIn} />)}
                    />

                    <Route
                        path="/applications/:id"
                        replace
                        render={
                            (props) => (<FlightsLandingPage {...props} clientMethods={this.methodReferences} isLoggedIn={this.state.isLoggedIn} />)}
                    />

                    <Route
                        path="/settings"
                        exact
                        replace
                        render={
                            (props) => (<SettingsLandingPage {...props} clientMethods={this.methodReferences} isLoggedIn={this.state.isLoggedIn} />)}
                    />

                    <Route
                        path="/user"
                        exact
                        replace
                        render={
                            (props) => (<UserLandingPage {...props} clientMethods={this.methodReferences} isLoggedIn={this.state.isLoggedIn} />)}
                    />

                    <Route
                        path="/user/login"
                        exact
                        replace
                        render={
                            (props) => (<UserLoginPage {...props} clientMethods={this.methodReferences} isLoggedIn={this.state.isLoggedIn} />)}
                    />

                    <Route
                        path="/user/logout"
                        exact
                        replace
                        render={
                            (props) => (<UserLogoutPage {...props} clientMethods={this.methodReferences} />)}
                    />

                    <Route
                        path="/about"
                        exact
                        replace
                        render={
                            (props) => (<AboutPage {...props} clientMethods={this.methodReferences} isLoggedIn={this.state.isLoggedIn} />)}
                    />
                    
                    <Route
                        path="*"
                        render={
                            (props) => (<NotFoundPage {...props} clientMethods={this.methodReferences} isLoggedIn={this.state.isLoggedIn} />)}
                    />
                </Switch>
            </Router>
        )
    };

}

export default LogUIClientApp;