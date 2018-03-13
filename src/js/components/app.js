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
			env: config('app.env')
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

	renderDevEnvSign() {
		return (
			<div className="dev-mode-sign d-flex justify-content-center align-items-center text-center px-3 py-2 mb-3">
				{locale.get('devMode')}
			</div>
		)
	}

	render() {

		const s = this.state;

		return (
			<div className={`app`}>

				{this.state.env === 'dev' ? this.renderDevEnvSign() : ''}

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
					<img src={config('content.profileImage')} alt="My profile picture" />
				</div>

				<div className="description container read">
					<p className="">{locale.get('content.description')}</p>
				</div>

				<div className="language container">
					<div className="w-100">
						<div className="read mb-4">
							<h2>{locale.get('common.languages')}</h2>
						</div>
						{
							config('content.language').map((lang, index) => {
								return <LanguageItem key={index}
												  name={lang.name}
												  start={lang.start}
												  desc={locale.get(`content.language.${lang.name.toLowerCase()}`)} 
												  libs={lang.libs}
												  logo={lang.logo}
										/>
							})
						}
					</div>
				</div>

				<div className="tool container">
					<div className="w-100">
						<div className="read mb-4">
							<h2>{locale.get('common.others')}</h2>
						</div>
						{
							config('content.tool').map((tool, index) => {
								return <LanguageItem key={index}
												  name={tool.name}
												  start={tool.start}
												  desc={locale.get(`content.tool.${tool.name.toLowerCase()}`)} 
												
												  logo={tool.logo}
										/>
							})
						}
					</div>
				</div>

				<div className="contact container">
					{
						config('content.contact').map((item, index) => {
							return <ContactItem key={index}
												url={item.url} 
												logo={`/src/img/${item.logo}`}
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