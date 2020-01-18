import React from 'react';
import './b.scss';
import moment from 'moment'

class B extends React.Component{

    getDate() {
        moment().format('MMMM Do YYYY, h:mm:ss a'); 
    }

    render() {
        return <div className="b-container">B Component</div>
    }
}

export default B;
