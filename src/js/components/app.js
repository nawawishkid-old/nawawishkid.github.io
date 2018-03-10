import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';
import ContactItem from './ContactItem';
import Route from './Route';
import Page from './Page';
import Rush from './Rush';
import {config, theme, Locale} from '../utils';

const locale = new Locale();

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			language: 'en-US',
			status: 'composing',
			steps: {
				test: 0,
			},
			targets: {
				test: '0,0',
			},
			step: 0,
			pageURL: '/',
		}

		window.addEventListener('popstate', () => {
			console.log('popstate');

			this.setState({pageURL: location.pathname})
		});
	}

	// Life cycle method
	componentDidMount() {
		//setTimeout(() => this.setState({steps: {test: 0}, targets: {test: '0,0'}}), 1000);
		setTimeout(() => this.setState({steps: {test: this.state.steps.test + 1}}), 1000);
		setTimeout(() => this.setState({steps: {test: this.state.steps.test + 1}}), 3000);
		setTimeout(() => this.setState({steps: {test: this.state.steps.test + 1}}), 5000);
		setTimeout(() => this.setState({steps: {test: this.state.steps.test + 1}}), 7000);
		//this.__pageComposingQueue('intro', [500, 800, ]);
	}

	changeAppLang(ev) {
		const lang = ev.target.dataset.value;

		document.querySelector('html').lang = lang;
		this.setState({language: lang});
	}

	onNavClick(ev) {
		this.setState({pageURL: location.pathname});
	}

	__pageComposingQueue(taskName, queueArray) {
		queueArray.forEach((time, index) => {
			let step = { [taskName]: index + 1 }

			if (queueArray[queueArray.length - index]) {

			}
			setTimeout(() => this.setState(step), time);
		});
		setTimeout(() => this.setState({step: 1}), 500); // push page
		setTimeout(() => this.setState({step: 2}), 800); // compose page fraction
		setTimeout(() => this.setState({step: 3}), 3360); // set page background-color
		setTimeout(() => this.setState({step: 4}), 3800); // hide page fraction, compose page components
		setTimeout(() => this.setState({step: 5}), 6360); // pull page
	}

	__pageComposingClassHandler() {

	}

	render() {
		console.log('step: ' + this.state.step);

		const s = this.state;
		const classes = {
			app: s.step > 0 && s.step < 5 ? 'active' : '',
			columns: s.step > 1 && s.step < 5 ? 'active' : ''
		};
		const styles = {
			app: {
				background: s.step >= 3 ? theme('color.layout.primary', '0') : 'white',
			},
			columns: {
				display: s.step >= 4 ? 'none' : 'flex',
			},
			appContent: {
				display: s.step >= 4 ? 'block' : 'none',
			}
		}
		let counter = 0;

		return (
			<div style={styles.app}
				 className={`react-app ${s.status} ${classes.app}`}>

				<div style={styles.columns}
					 className={`composing-columns ${classes.columns}`}>
					{
						[...Array(24).keys()].map((item, index) => {
							let x = s.step >= 2 ? 0 : '500px', //index > 24/2 ? '500px' : '-500px';
								y = s.step >=2 ? 0 : index % 2 != 0 ? '-1000px' : '1000px';

							counter += 0.05;

							return <div className={`composing-columns-column`}
										style={{
											width: 100/24 + '%',
											transition: `all .6s linear ${counter}s`,
											background: theme('color.layout.primary', '0'),
											transform: `translate(${x}, ${y})`
										}}
										key={index}
									></div>
						})
					}
				</div>

				<header className="react-header">
					<h1>{locale.get(`page.${this.state.pageURL.replace('/', '')}`)}</h1>

					<nav className="nav">
						<Route href="/" onClick={this.onNavClick.bind(this)}>{locale.get('page.')}</Route>
						<Route href="/about" onClick={this.onNavClick.bind(this)}>{locale.get('page.about')}</Route>
						<Route href="/contact" onClick={this.onNavClick.bind(this)}>{locale.get('page.contact')}</Route>
					</nav>

					<Dropdown
						label={locale.get('localeName')}
						id="langButton"
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

				<div className="react-contact">
					{
						config('content.contact').map((item, index) => {
							return <ContactItem key={index}
												url={item.url} 
												icon={item.icon} 
												height={32} 
												width={32 * (item.size[0] / item.size[1])}
												className="react-contact-item" />
						})
					}
				</div>

				<Rush id="test"
					  step={this.state.steps.test}
					  target={['100px,0', '0,100px', '-100px,0', '0,-100px']}
					  duration={2}
					  timeFunc="ease-out"
					  sequentialTarget={true}
					  initialTarget="100px,0"
				>
					<div style={{
						background: 'red',
						width: '100px',
						height: '100px'
					}}></div>
				</Rush>

				<div style={styles.appContent}
					 className="react-app-page"
					 id="page"
				>

					<Page url="/">
						Home
					</Page>
					<Page url="/about">
						About
					</Page>

					<Page url="/contact">
						<article>
							{locale.get('selfDesc')}
						</article>
					</Page>
				</div>
			</div>
		);
	}
}

if (document.getElementById('app')) {
	ReactDOM.render(<App />, document.getElementById('app'));
}