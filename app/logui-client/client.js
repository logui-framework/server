import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import HeaderPageComponent from './common/header';
import TrailPageComponent from './nav/trail/trail';
import MenuPageComponent from './nav/menu/menu';

import LandingPage, {Submenu as LandingPageSubmenu} from './common/landing';
import ApplicationsLandingPage from './applications/landing';
import SettingsLandingPage from './settings/landing';

import UserLandingPage from './user/landing';

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
        };

        this.setMenuComponent = this.setMenuComponent.bind(this);
        this.setTrailComponent = this.setTrailComponent.bind(this);

        this.methodReferences = {
            setMenuComponent: this.setMenuComponent,
            setTrailComponent: this.setTrailComponent,
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

    componentDidMount() {
        setTimeout(
            () => {
                this.setState({
                    hideSplashScreen: true
                })
            },
            Constants.SPLASH_PERSIST_DELAY
        );
    }

    render() {
        return(
            <Router>
                <LoadingSplash hideSplashScreen={this.state.hideSplashScreen} />
                <HeaderPageComponent />
                <TrailPageComponent currentTrail={this.state.currentTrail} />
                <MenuPageComponent currentMenuComponent={this.state.currentMenuComponent} />
                
                <Switch>
                    <Route
                        path="/"
                        exact
                        replace
                        render={
                            (props) => (<LandingPage {...props} clientMethods={this.methodReferences} />)}
                    />

                    <Route
                        path="/applications"
                        exact
                        replace
                        render={
                            (props) => (<ApplicationsLandingPage {...props} clientMethods={this.methodReferences} />)}
                    />

                    <Route
                        path="/settings"
                        exact
                        replace
                        render={
                            (props) => (<SettingsLandingPage {...props} clientMethods={this.methodReferences} />)}
                    />

                    <Route
                        path="/user"
                        exact
                        replace
                        render={
                            (props) => (<UserLandingPage {...props} clientMethods={this.methodReferences} />)}
                    />

                    <Route
                        path="/about"
                        exact
                        replace
                        render={
                            (props) => (<AboutPage {...props} clientMethods={this.methodReferences} />)}
                    />
                    
                    <Route
                        path="*"
                        render={
                            (props) => (<NotFoundPage {...props} clientMethods={this.methodReferences} />)}
                    />
                </Switch>
            </Router>
        )
    };

}

export default LogUIClientApp;