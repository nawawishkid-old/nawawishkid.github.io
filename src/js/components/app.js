import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';
import {config, Locale} from '../utils';

const locale = new Locale();

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			language: 'en_US',
		}
	}

	changeAppLang(ev) {
		const lang = ev.target.dataset.value;

		document.querySelector('html').lang = lang;
		this.setState({language: lang});
	}

	render() {
		console.log(config('content.contact.0.name'));

		return (
			<div className="react-app">
				<header className="react-header row">
					<Dropdown
						label={locale.get('localeName')}
						id="langButton"
						wrapperStyle={{
							marginLeft: 'auto'
						}}
					>
						{
							Object.entries(locale.getLocales())
								.map((item, index) => (
									<DropdownItem
										key={index}
										value={item[0]}
										onClick={this.changeAppLang.bind(this)}
										active={locale.getLang() === item[0] ? true : false}
									>
										{item[1].localeName}
									</DropdownItem>
								))
						}
					</Dropdown>
				</header>
				<article>
					{locale.get('selfDesc')}
					{
						config('content.contact').map((item, index) => {
							return (
								<div className="card" key={index}>
									<div className="card-header">{item.name}</div>
									<div className="card-footer">{item.url}</div>
								</div>
							)
						})
					}
				</article>
			</div>
		);
	}
}

if (document.getElementById('app')) {
	ReactDOM.render(<App />, document.getElementById('app'));
}