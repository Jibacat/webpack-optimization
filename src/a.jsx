import React from 'react';
import moment from 'moment'

import './a.scss';

class A extends React.Component{

    getDate() {
        moment().format('MMMM Do YYYY, h:mm:ss a');
    }

    throwError() {
        throw 123;
    }

    render() {
        return <div className="a-container" onClick={this.throwError}>A Component</div>
    }
}

export default A;