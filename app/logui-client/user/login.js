import React, { useDebugValue } from 'react';
import {Redirect} from 'react-router-dom';
import Menu from './menu';
import TrailItem from '../nav/trail/trailItem';
import Footer from '../common/footer';
import LogUIDevice from '../common/logUIDevice';

class UserLoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.doLogin = this.doLogin.bind(this);

        this.state = {
            username: '',
            password: '',
            loginState: 0, // 0 for initial, 1 for bad username/password, 2 for successful login.
        };
    }

    getTrail() {
        return [
            <TrailItem key="1" to="/" displayText="LogUI" />,
            <TrailItem key="2" to="/user" displayText="User Management" />,
            <TrailItem key="3" to="/user/login" displayText="Login" />,
        ];
    }

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            this.props.clientMethods.setMenuComponent(Menu);
            this.props.clientMethods.setTrailComponent(this.getTrail());
            this.usernameField.focus();
        }
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }

    async doLogin(e) {
        e.preventDefault();
        var response = await this.props.clientMethods.login(this.state.username, this.state.password);
        
        if (!response.loginSuccess) {
            this.setState({
                loginState: 1,
                password: '',
            });

            this.passwordField.value = '';
            return;
        }

        this.setState({
            loginState: 2
        });
    }

    updateUsername(value) {
        this.setState({
            username: value,
        });
    }

    updatePassword(value) {
        this.setState({
            password: value,
        });
    }

    render() {
        if (this.props.isLoggedIn) {
            return (<Redirect to="/" />);
        }
        else {
            var loginMessage = "Enter your username and password into the input fields, and click the Login button.";

            switch (this.state.loginState) {
                case 1:
                    loginMessage = "An unrecognised username and/or password were supplied. Please try again.";
                    break;
                case 2:
                    return (<Redirect to="/" />);
            }
    
            return(
                <main>
                    <section>
                        <div className="header-container">
                            <h1>Login</h1>
                        </div>
        
                        <p>
                            <strong>Welcome to <LogUIDevice />!</strong> This is the interface from where you can control this instance of the <span className="logui">Log<strong>UI</strong></span> server; from creating new application references, to downloading interaction logs.
                        </p>
        
                        <div className="split login">
        
                            <form onSubmit={this.doLogin}>
                                <label>
                                    <span>Username</span>
                                    <input type="text" name="username" onChange={e => this.updateUsername(e.target.value)} ref={(input) => { this.usernameField = input; }}  />
                                </label>
                                <label>
                                    <span>Password</span>
                                    <input type="password" name="password" onChange={e => this.updatePassword(e.target.value)} ref={(input) => { this.passwordField = input; }} />
                                </label>
                                <div className="buttonInlineSeparator">
                                    <button type="submit">Login</button>
                                    <button type="reset">Clear</button>
                                </div>
                            </form>
        
                            <div className={`message-box right ${this.state.loginState == 1 ? 'warning' : 'info'}`}>
                                {loginMessage}
                            </div>
        
                        </div>
                    </section>

                    <Footer />
                    
                </main>
            );
        }
    };

}

export default UserLoginPage;