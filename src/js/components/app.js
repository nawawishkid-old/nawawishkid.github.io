import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';
import ContactItem from './ContactItem';
import LanguageItem from './LanguageItem';
import {config, theme, Locale} from '../utils';

const locale = new Locale();

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			language: document.documentElement.lang,
			pageURL: '/',
		}

		window.addEventListener('popstate', () => {
			console.log('popstate');

			this.setState({pageURL: location.pathname})
		});
	}

	// Life cycle method
	componentDidMount() {
	}

	changeAppLang(ev) {
		const lang = ev.target.dataset.value;

		document.querySelector('html').lang = lang;
		this.setState({language: lang});
	}

	onNavClick(ev) {
		this.setState({pageURL: location.pathname});
	}

	render() {

		const s = this.state;

		return (
			<div className={`app`}>

				<header className="header">

					<Dropdown
						label={locale.get('localeName')}
						id="langButton"
						wrapperClassName="ml-auto"
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

				<div className="profile-image container">
					<img src="https://pbs.twimg.com/profile_images/967818388759171073/JQ2nc_Dr_400x400.jpg" alt="My profile picture" />
				</div>

				<div className="description container read">
					<p className="">{locale.get('content.description')}</p>
				</div>

				<div className="language container">
					<div className="w-100">
						{
							config('content.language').map((lang, index) => {
								return <LanguageItem key={index}
												  name={lang.name}
												  start={lang.start}
												  desc={locale.get(`content.language.${lang.name.toLowerCase()}`)} 
												  libs={lang.libs}
										/>
							})
						}
					</div>
				</div>

				<div className="technology container read">
					<div>
						{
							config('content.tool').map((tool, index) => {
								console.log(tool);
								return <p key={index}>{tool.name}</p>
							})
						}
					</div>
				</div>

				<div className="contact container">
					{
						config('content.contact').map((item, index) => {
							return <ContactItem key={index}
												url={item.url} 
												icon={item.icon} 
												height={32} 
												width={32 * (item.size[0] / item.size[1])}
												className="contact-item" />
						})
					}
				</div>
			</div>
		);
	}
}

if (document.getElementById('app')) {
	ReactDOM.render(<App />, document.getElementById('app'));
}