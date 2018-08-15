import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import HelloWorld from "./components/hello";

ReactDOM.render(
    <HelloWorld/>,
    document.getElementById('root')
);
