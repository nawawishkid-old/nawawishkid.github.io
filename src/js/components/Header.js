import React, { Component } from 'react';

export default class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log('Header.render()');
		return <header>Header</header>;
	}
}