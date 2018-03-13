import React, { Component } from 'react';
import {Locale} from '../utils';

const locale = new Locale();

export default class LanguageItem extends Component {
	constructor(props) {
		super(props);
	}

	renderLibsItem() {
		const p = this.props;

		return (
			<div className="language-item-libs">
				<p><b>-- Libraries/frameworks --</b></p>
				{
					p.libs.map((lib, index) => {
						return (
							<div className="language-item-lib mb-3 px-1 px-sm-3" key={index}>
								<img className="mr-1 mr-md-3"
									 src={`/src/img/${lib.logo}`}
									 alt={`${lib.name} logo`} 
								/>
								<b>{lib.name}</b> 
								<small className="float-right">{locale.get('common.since').toLowerCase() + ' ' + lib.start}</small>
							</div>
						)
					})
				}
			</div>
		);
	}

	render() {
		const p = this.props;
		const contentId = `language-item-${p.name}`;

		const libs = p.libs ? this.renderLibsItem() : '';

		return (
			<div className="language-item-js mb-5"
				 style={p.style}
			>
				<div className="language-item-header read px-2"
					 onClick={ev => {
					 	p.headerOnClick(ev)
					 }}
				>
					<a className="clearfix"
						 data-toggle="collapse" 
						 href={`#${contentId}`}
						 aria-expanded="false" 
						 aria-controls={contentId}
					>
						<div className="language-item-name float-left d-flex mb-2">
							<img className="mr-3"
								 src={`src/img/${p.logo}`} 
								 alt={`${p.name} logo`} 
							/>
							<h4 style={p.nameStyle}>
								{p.name}
							</h4>
						</div>
						<small className="language-item-start float-right" style={p.startStyle}>
							{locale.get('common.since').toLowerCase() + ' ' + p.start}
						</small>
					</a>
				</div>

				<div id={contentId} className="collapse">
					<div className="language-item-detail p-2 p-sm-3"
					 	 style={p.descStyle}
					>
						<p className="language-item-desc" dangerouslySetInnerHTML={{__html: p.desc}}></p>
						{ libs }
					</div>
				</div>
			</div>
		);
	}
}

LanguageItem.defaultProps = {
	headerOnClick: () => {}
}