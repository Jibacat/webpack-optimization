import React from 'react';
import ReactDom from 'react-dom';
import A from './src/a';
import B from './src/b';

import $ from 'jquery';

ReactDom.render(<div>
    <A></A>
    <B></B>
</div>, document.getElementById("root"));

$(document).ready(function(){
    console.log('index');
});
