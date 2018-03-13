import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ContactItem extends Component {
	constructor(props) {
		super(props);

		console.log(this.props.width);

		this.styles = {
			main: {
				padding: '1em'
			},
			link: {

			},
			logo: {
				width: this.props.width + 'px',
				height: this.props.height + 'px',
				backgroundImage: `url(${this.props.logo})`,
				/*display: 'inline-block',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundSize: '100%'*/
			}
		}
	}

	render() {
		const p = this.props;
		//console.log({...this.styles.logo});

		return (
			<a href={p.url} 
			   style={{...this.styles.logo, ...p.style}}
			   target="_blank"
			   className={p.className}
			></a>
		);
	}
}

ContactItem.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	className: PropTypes.string,
	style: PropTypes.object,
}
ContactItem.defaultProps = {
	width: 32,
	height: 32,
	className: '',
	style: {},
}