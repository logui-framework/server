import React from 'react';
import Menu from '../applications/menu';
import TrailItem from '../nav/trail/trailItem';
import LogUIDevice from '../common/logUIDevice';

class ApplicationAddPage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            
        };
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
    }

    render() {
        return(
            <main>
                <section>
                    <div className="header-container">
                        <h1>Add New Application</h1>
                    </div>

                    <p>
                        Here, you can add a new application to track with <LogUIDevice />. Fill out the form fields below, and click <strong>Add</strong> to add the new application to the database.
                    </p>

                    <p>
                        Form goes here.
                    </p>
                </section>
            </main>
        )
    };

}

export default ApplicationAddPage;