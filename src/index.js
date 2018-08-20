import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import SearchBar from "./components/SearchBar";
import './styles/BackgroundStyle.css';
import BookManager from "./containers/BookManager";


ReactDOM.render(
    <BookManager/>,
    document.getElementById('root')
);
