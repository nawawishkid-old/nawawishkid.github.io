import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DropdownItem extends Component {
	constructor(props) {
		console.log('DropdownItem.constructor()');
		super(props);
	}

	render() {
		console.log('DropdownItem.render()');
		
		const p = this.props;

		return (
			<a 
				className={'dropdown-item ' + p.className}
				href={p.href}
				onClick={p.onClick}
				data-value={p.value}
			>
				{p.children}
			</a>
		);
	}
}

DropdownItem.propTypes = {
	children: PropTypes.node.isRequired,
	href: PropTypes.string,
	className: PropTypes.string,
	value: PropTypes.string,
}

DropdownItem.defaultProps = {
	children: 'list 1',
	href: '#',
	className: 'nothing',
	value: '',
}