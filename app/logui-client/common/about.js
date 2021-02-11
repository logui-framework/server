import React from 'react';
import Constants from '../constants';
import TrailItem from '../nav/trail/trailItem';
import BottomLogo from '../common/bottomLogo';
import ConferenceProceedings from '../common/conferenceProceedings';
import LogUIDevice from '../common/logUIDevice';

class AboutPage extends React.Component {

    getTrail() {
        return [
            <TrailItem key="1" to="/" displayText="LogUI" />,
            <TrailItem key="2" to="/about" displayText="About LogUI" />,
        ];
    }

    componentDidMount() {
        this.props.clientMethods.setMenuComponent(null);
        this.props.clientMethods.setTrailComponent(this.getTrail());
    }

    render() {
        return (
            <main>
                <h1>About LogUI</h1>
                <p><LogUIDevice /> is a contemporary logging library for capturing user interactions in web-based experiments. Designed with the Information Retrieval community in mind, <LogUIDevice /> can be applied anywhere fine-grained logging is required in a web environment. You can find more information about <LogUIDevice /> on our <a href="https://www.github.com/logui-framework/" target="_blank">GitHub</a> page.</p>

                <h2>Who wrote <LogUIDevice />?</h2>
                <p><LogUIDevice /> is a project of the <a href="https://www.tudelft.nl/ewi/over-de-faculteit/afdelingen/software-technology/web-information-systems/projects/lambda-lab" target="_blank">Lambda Lab</a> at <a href="https://www.tudelft.nl" target="_blank">Delft University of Technology</a> in The Netherlands. Development is led by <a href="https://www.dmax.org.uk" target="_blank">Dr David Maxwell</a>, a postdoctoral researcher. Associate Professor <a href="https://chauff.github.io/" target="_blank">Dr Claudia Hauff</a> is the PI of the Lambda Lab, where we look at Information Retrieval research; specifically, Search as Learning.</p>

                <h2>Using <LogUIDevice /> in your Research?</h2>
                <p>Are you using <LogUIDevice /> to capture data for your experiments? We're thrilled that you are! In return for using our software, we kindly ask that you <strong>cite our demonstration paper in your work when discussing your methodology.</strong> The BibTeX code is available in the box below.</p>

                <ConferenceProceedings />

                <p className="bottom">
                    <LogUIDevice /> Control App, version <code>{Constants.LOGUI_CLIENTAPP_VERSION}</code><br />
                    Running on <code>{LOGUI_CLIENTAPP_HOSTNAME}</code>
                </p>

                <BottomLogo />
            </main>
        );
    }

}

export default AboutPage;