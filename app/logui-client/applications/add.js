import React from 'react';
import Menu from '../applications/menu';
import TrailItem from '../nav/trail/trailItem';
import LogUIDevice from '../common/logUIDevice';
import Constants from '../constants';
import {withRouter, Redirect} from 'react-router-dom';

class ApplicationAddPage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            applicationName: '',
            formState: 0,
        };

        this.processForm = this.processForm.bind(this);
    }

    getTrail() {
        return [
            <TrailItem key="1" to="/" displayText="LogUI" />,
            <TrailItem key="2" to="/applications/" displayText="Applications" />,
            <TrailItem key="3" to="/applications/add/" displayText="Add New Application" />,
        ];
    }

    async componentDidMount() {
        this.props.clientMethods.setMenuComponent(Menu);
        this.props.clientMethods.setTrailComponent(this.getTrail());
        this.newApplicationNameField.focus();
    }

    async checkApplicationName(currentName) {
        var response = await fetch(`${Constants.SERVER_API_ROOT}application/add/check/?name=${currentName}`, {
            method: 'GET',
            headers: {
                'Authorization': `jwt ${this.props.clientMethods.getLoginDetails().token}`
            },
        });

        await response.json().then(data => {
            this.handleNameCheckResponse(data);
        });
    }

    handleNameChange(value) {
        this.checkApplicationName(value);

        this.setState({
            applicationName: value,
        });
    }

    handleNameCheckResponse(data) {
        if (!data.is_available) {
            this.setState({
                formState: 2,
            });

            return;
        }

        if (this.state.formState == 2) {
            this.setState({
                formState: 1,
            });
        }
    }

    formFieldFocusBlur(isFocus) {
        if (this.state.formState == 2) {
            return;
        }

        this.setState({
            formState: isFocus ? 1 : 0,
        });
    }

    processForm(e) {
        e.preventDefault();

        if (this.state.formState == 2 || this.state.formState == 3) {
            console.log('ignore');
            return;
        }

        var response = fetch(`${Constants.SERVER_API_ROOT}application/add/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `jwt ${this.props.clientMethods.getLoginDetails().token}`,
            },
            body: JSON.stringify({
                name: this.state.applicationName,
            }),
        }).then(e => {
            switch (e.status) {
                case 201:
                    this.props.clientMethods.setMenuShouldUpdate(true);

                    this.setState({
                        formState: 4,
                    });
                    break;
                case 409:
                    this.setState({
                        formState: 2,
                    });
                    break;
                default:
                    this.setState({
                        formState: 3,
                    });
                    break;
            }
        });
    }

    renderRedirect() {
        if (this.state.formState == 4) {
            return (<Redirect to="/applications" />);
        }
    }

    render() {
        let messageBox = null;

        // 0 is default
        // 1 is click on the field
        // 2 is when the name is already taken.
        // 3 something went wrong on submission.
        // 4 success, added.

        switch (this.state.formState) {
            case 1:
                messageBox = 
                    <div className="message-box right info">
                        Type a new application name into this field.
                    </div>;
                break;
            case 2:
                messageBox = 
                    <div className="message-box right info warning">
                        This application name already exists. Please try another one.
                    </div>;
                break;
            case 3:
                messageBox = 
                    <div className="message-box right info warning">
                        Something went wrong with the submission of the form. Please resubmit, or try again later.
                    </div>;
                break;
            default:
                messageBox = 
                    <div className="message-box right info">
                        Enter a new application name into the input field, and click Add New Application.
                    </div>;
        }

        return(
            <main>
                {this.renderRedirect()}
                <section>
                    <div className="header-container">
                        <h1>Add New Application</h1>
                    </div>

                    <p>
                        Here, you can add a new application to track with <LogUIDevice />. Fill out the form fields below, and click <strong>Add New Application</strong> to add the new application to the database.
                    </p>

                    <div className="split add">
        
                        <form onSubmit={this.processForm}>
                            <label>
                                <span>Name</span>
                                <input type="text"
                                       name="name"
                                       onFocus={e => this.formFieldFocusBlur(true)}
                                       onBlur={e => this.formFieldFocusBlur(false)}
                                       onChange={e => this.handleNameChange(e.target.value)}
                                       ref={(input) => { this.newApplicationNameField = input; }} />
                            </label>
                            <div className="buttonInlineSeparator">
                                <button type="submit" disabled={this.state.formState == 2 || this.state.applicationName == '' ? true : false}>Add New Application</button>
                                <button type="reset" onClick={e => this.handleNameChange('')}>Clear</button>
                            </div>
                        </form>

                        {messageBox}

                    </div>
                </section>
            </main>
        )
    };

}

export default ApplicationAddPage;