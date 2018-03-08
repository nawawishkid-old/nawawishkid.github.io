import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';

const App = () => <Header />;

if (document.getElementById('app')) {
	ReactDOM.render(<App />, document.getElementById('app'));
}