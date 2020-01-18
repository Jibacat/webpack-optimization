import React from 'react';
import ReactDom from 'react-dom';
import A from './src/a';
import B from './src/b';

import $ from 'jquery';

ReactDom.render(<div>
    <B></B>
    <A></A>
</div>, document.getElementById("root2"));

$(document).ready(function(){
    console.log('index2');
});
