import React from 'react';
import Menu from './menu';
import TrailItem from '../nav/trail/trailItem';
import Constants from '../constants';
import {Redirect} from 'react-router-dom';

class ViewFlightsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasFailed: false,
            appInfo: null,
        };
    }

    getTrail() {
        if (this.state.hasFailed || !this.state.appInfo) {
            return [];
        }

        return [
            <TrailItem key="1" to="/" displayText="LogUI" />,
            <TrailItem key="2" to="/applications" displayText="Applications" />,
            <TrailItem key="3" to={`/applications/${this.props.match.params.id}`} displayText={this.state.appInfo.name} />,
        ];
    }

    async getListing() {
        var response = await fetch(`${Constants.SERVER_API_ROOT}application/info/${this.props.match.params.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `jwt ${this.props.clientMethods.getLoginDetails().token}`
            },
        });

        await response.json().then(data => {
            if (response.status == 200) {
                this.setState({
                    appInfo: data,
                });

                return;
            }

            this.setState({
                hasFailed: true,
            })
        });
    }

    async componentDidMount() {
        await this.getListing();
        this.props.clientMethods.setMenuComponent(Menu);
        this.props.clientMethods.setTrailComponent(this.getTrail());
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.getListing();
            this.props.clientMethods.setTrailComponent(this.getTrail());
        }
    }

    render() {
        if (this.state.hasFailed) {
            return(
                <Redirect to="/" />
            );
        }

        if (!this.state.appInfo) {
            return(null); // Could add a loading thing here.
        }

        return(
            <main>
                <section>
                    <h1>{this.state.appInfo.name}</h1>
                </section>
            </main>
        );
    }

}

export default ViewFlightsPage;