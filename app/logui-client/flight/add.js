import React from 'react';
import Menu from '../applications/menu';
import TrailItem from '../nav/trail/trailItem';
import Constants from '../constants';
import LogUIDevice from '../common/logUIDevice';
import {Redirect} from 'react-router-dom';

class FlightAddPage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            hasFailed: false,
            appInfo: null,
            flightName: '',
            fqdn: '',
            formState: 0,
            alreadyExists: false,
        };

        this.processForm = this.processForm.bind(this);
    }

    getTrail() {
        if (this.state.hasFailed || !this.state.appInfo) {
            return [];
        }
        
        return [
            <TrailItem key="1" to="/" displayText="LogUI" />,
            <TrailItem key="2" to="/applications/" displayText="Applications" />,
            <TrailItem key="3" to={`/applications/${this.state.appInfo.id}/`} displayText={`${this.state.appInfo.name}`} />,
            <TrailItem key="4" to={`/applications/${this.state.appInfo.id}/add/`} displayText="Add New Flight" />,
        ];
    }

    async getAppDetails() {
        var response = await fetch(`${Constants.SERVER_API_ROOT}application/specific/${this.props.match.params.id}`, {
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
        await this.getAppDetails();
        this.props.clientMethods.setMenuComponent(Menu);
        this.props.clientMethods.setTrailComponent(this.getTrail());
        this.flightNameField.focus();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            await this.getAppDetails();
            this.props.clientMethods.setTrailComponent(this.getTrail());
        }
    }

    async checkFlightName(currentValue) {
        var response = await fetch(`${Constants.SERVER_API_ROOT}flight/${this.state.appInfo.id}/add/check/?flightName=${currentValue}`, {
            method: 'GET',
            headers: {
                'Authorization': `jwt ${this.props.clientMethods.getLoginDetails().token}`
            },
        });

        await response.json().then(data => {
            this.checkFlightNameResponse(data);
        });
    }

    checkFlightNameResponse(data) {
        if (!data.is_available) {
            this.setState({
                formState: 3,
                alreadyExists: true,
            });

            return;
        }

        this.setState({
            formState: 1,
            alreadyExists: false,
        });
    }

    handleFieldChange(fieldName, value) {
        if (fieldName == 'flightName') {
            this.checkFlightName(value);
        }

        let newState = {};
        newState[fieldName] = value;
        this.setState(newState);
    }

    handleFieldFocusBlur(fieldName, isFocused) {
        let toState = 0;

        if ((this.state.alreadyExists && !isFocused) ||
            (this.state.alreadyExists && isFocused && fieldName == 'flightName')) {
            this.setState({
                formState: 3,
            });

            return;
        }

        switch (fieldName) {
            case 'flightName':
                toState = isFocused ? 1 : 0;
                break;
            case 'fqdn':
                toState = isFocused ? 2 : 0;
                break;
        }

        this.setState({
            formState: toState,
        });
    }

    clearForm() {
        this.setState({
            flightName: '',
            fqdn: '',
            formState: 0,
            alreadyExists: false,
        });

        this.flightNameField.focus();
    }

    processForm(e) {
        e.preventDefault();

        if (this.state.alreadyExists || this.state.flightName == '' || this.state.fqdn == '') {
            return;
        }

        var response = fetch(`${Constants.SERVER_API_ROOT}flight/${this.state.appInfo.id}/add/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `jwt ${this.props.clientMethods.getLoginDetails().token}`,
            },
            body: JSON.stringify({
                flightName: this.state.flightName,
                fqdn: this.state.fqdn,
            }),
        }).then(e => {
            switch (e.status) {
                case 201:
                    this.setState({
                        formState: 5,
                    });
                    break;
                case 409:
                    this.setState({
                        formState: 3,
                        alreadyExists: true,
                    });
                    break;
                default:
                    this.setState({
                        formState: 4,
                    });
                    break;
            }
        });
    }

    renderRedirect() {
        if (this.state.formState == 5) {
            return (<Redirect to={`/applications/${this.state.appInfo.id}/`} />);
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

        let messageBox = null;

        // 0 is default
        // 1 is click on the flightName field
        // 2 is click on the fqdn field
        // 3 is when the name is already taken
        // 4 something went wrong submitting the form
        // 5 added successfully, redirect required
        switch (this.state.formState) {
            case 1:
                messageBox = 
                    <div className="message-box right info">
                        Enter a name for the new {this.state.appInfo.name} flight. The name is simply a label that makes it easy for you to identify a given flight.
                    </div>
                break;
            case 2:
                messageBox = 
                    <div className="message-box right info">
                        Enter the host/domain where your experimental system resides. Ensure this is the full domain that will be used by participants. If this is not correct, logging will not work.<br />
                        For example, if your system is at <code>http://server.institute.nl/app/</code>, enter <code>server.institute.nl</code>. If your application resides at a non-standard port (e.g. <code>8080</code>, include this like <code>server.institute.nl:8080</code>)
                    </div>
                break;
            case 3:
                messageBox = 
                    <div className="message-box right warning">
                        The specified flight name already exists for the {this.state.appInfo.name} application. Please try a different name.
                    </div>
                break;
            case 4:
                messageBox = 
                    <div className="message-box right warning">
                        Something went wrong with the submission of the form. Please resubmit, or try again later.
                    </div>
                break;
            default:
                messageBox = 
                    <div className="message-box right info">
                        To create a new flight for {this.state.appInfo.name}, specify a name for it (unique to the application), and the hostname/domain where your experimental system is located.
                    </div>
        }

        return (
            <main>
                {this.renderRedirect()}
                <section>
                    <div className="header-container">
                        <h1>Add New Flight</h1>
                    </div>

                    <p>
                        Here, you can add a new {this.state.appInfo.name} flight to track with <LogUIDevice />. Fill out the form below, and then click <strong>Add New Flight</strong> to store it in the database.
                    </p>

                    <div className="split add">

                        <form onSubmit={this.processForm}>
                            <label>
                                <span>Flight Name</span>
                                <input type="text"
                                       name="flightName"
                                       onChange={e => this.handleFieldChange('flightName', e.target.value)}
                                       onFocus={e => this.handleFieldFocusBlur('flightName', true)}
                                       onBlur={e => this.handleFieldFocusBlur('flightName', false)}
                                       ref={(input) => { this.flightNameField = input; }} />
                            </label>
                            <label>
                                <span>Domain</span>
                                <input type="url"
                                       name="fqdn"
                                       onChange={e => this.handleFieldChange('fqdn', e.target.value)}
                                       onFocus={e => this.handleFieldFocusBlur('fqdn', true)}
                                       onBlur={e => this.handleFieldFocusBlur('fqdn', false)} />
                            </label>
                            <div className="buttonInlineSeparator">
                                <button type="submit" disabled={this.state.alreadyExists || this.state.flightName == '' || this.state.fqdn == '' ? true : false}>Add New Flight</button>
                                <button type="reset" onClick={e => {this.clearForm()}}>Clear</button>
                            </div>
                        </form>

                        {messageBox}

                    </div>
                </section>
            </main>
        )
    };

}

export default FlightAddPage;