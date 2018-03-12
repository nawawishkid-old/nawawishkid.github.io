import React, { Component } from 'react';
import {Locale} from '../utils';

const locale = new Locale();

const LanguageItem = props => {
	const contentId = `language-item-${props.name}`;

	const libs = props.libs ? 
				(
					<div className="language-item-libs">
						<p>Library/framework:</p>
						{
							props.libs.map(lib => {
								return (
									<span className="language-item-lib">{lib.name} since {lib.start}</span>
								)
							})
						}
					</div>
				) : '';

	return (
		<div className="language-item-js my-1"
			 style={props.style}
		>
			<div className="language-item-header p-3">
				<a className="clearfix"
					 data-toggle="collapse" 
					 href={`#${contentId}`}
					 aria-expanded="false" 
					 aria-controls={contentId}
				>
					<div className="language-item-name float-left"  style={props.nameStyle}>
						{props.name}
					</div>
					<div className="language-item-start float-right" style={props.startStyle}>
						{props.start}
					</div>
				</a>
			</div>

			<div id={contentId}
				 className="language-item-detail collapse p-3"
				 style={props.descStyle}
			>
				<p className="language-item-desc">{props.desc}</p>
				{ libs }
			</div>
		</div>
	);
}

export default LanguageItem;