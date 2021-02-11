import React from 'react';

class ConferenceProceedings extends React.Component {

    render() {
        return (
            <code className="block">
                @inproceedings{"{"}maxwell2021logui,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;author = {"{"}Maxwell, David and Hauff, Claudia{"}"},<br />
                &nbsp;&nbsp;&nbsp;&nbsp;title = {"{"}LogUI: Contemporary Logging Infrastructure for Web-Based Experiments{"}"},<br />
                &nbsp;&nbsp;&nbsp;&nbsp;booktitle = {"{"}Proceedings of the 43\textsuperscript{"{"}rd{"}"} ECIR{"}"},<br />
                &nbsp;&nbsp;&nbsp;&nbsp;year = {"{"}2021{"}"},<br />
                &nbsp;&nbsp;&nbsp;&nbsp;pages = {"{"}???-???{"}"}<br />
                {"}"}
            </code>
        );
    }

}

export default ConferenceProceedings;