import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DropdownItem extends Component {
	constructor(props) {
		//console.log('DropdownItem.constructor()');
		super(props);
	}

	__onClick(ev) {
		this.props.onClick(ev);
		this.handleActiveItem(ev);
	}

	handleActiveItem(ev) {
		if (ev.target.classList.contains('active')) return;

		const $this = ev.target;
		let siblings = Array.from($this.parentElement.children);

		siblings.splice(siblings.indexOf($this), 1);

		//console.log(siblings);

		siblings.forEach(item => {
			item.classList.remove('active');
		});

		$this.classList.add('active');
	}

	render() {
		//console.log('DropdownItem.render()');
		
		const p = this.props;
		const active = p.active ? 'active ' : '';

		return (
			<a 
				className={'dropdown-item ' + active + p.className}
				href={p.href}
				onClick={this.__onClick.bind(this)}
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
	active: PropTypes.bool,
}

DropdownItem.defaultProps = {
	children: 'list 1',
	href: '#',
	className: '',
	value: '',
	active: false,
}