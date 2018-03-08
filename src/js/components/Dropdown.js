import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownItem from './DropdownItem';

export default class Dropdown extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		//console.log('Dropdown.render()');

		const p = this.props;

		return (
			<div className={'dropdown ' + p.wrapperClassName} style={p.wrapperStyle}>
				<button 
					type="button" className={'btn dropdown-toggle ' + p.labelClassName}
					id={p.id} style={p.labelStyle}
					data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
				>
					{p.label}
				</button>
				<div 
					className={'dropdown-menu ' + p.dropdownClassName}
					style={p.dropdownStyle}
					aria-labelledby={p.id}
				>
					{p.children}
				</div>
			</div>
		);
	}
}

Dropdown.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.element,
	]),
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	wrapperClassName: PropTypes.string,
	wrapperStyle: PropTypes.object,
	labelClassName: PropTypes.string,
	labelStyle: PropTypes.object,
	dropdownClassName: PropTypes.string,
	dropdownStyle: PropTypes.object,
}

Dropdown.defaultProps = {
	children: <DropdownItem />,
	label: 'Dropdown',
	wrapperClassName: '',
	wrapperStyle: {},
	labelClassName: '',
	labelStyle: {},
	dropdownClassName: '',
	dropdownStyle: {},
}