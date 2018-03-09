import React, { Component } from 'react';

export default class Route extends Component {
	constructor(props) {
		super(props);
	}

	onClick(ev) {
		let url = this.props.href;

		ev.preventDefault();

		console.log(history.length);

		if (url !== history.state) {
			console.log('pushState');
			history.pushState(url, url, url);
		}

		this.props.onClick(ev);
	}

	render() {
		const p = this.props;

		return (
			<a href={p.href}
			   onClick={this.onClick.bind(this)}
			   className={p.className}
			   style={p.style}
			>
				{p.children}
			</a>
		);
	}
}

Route.defaultProps = {
	children: 'route',
	href: '#',
	className: '',
	style: {},
	onClick: () => {},
}