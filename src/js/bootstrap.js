import {config, Locale} from './utils';
import Axios from 'axios';

try {
	window.$ = window.jQuery = require('jquery');
	window.Popper = require('popper.js');

	require('bootstrap');
} catch (e) {}

Axios.get('https://medium.com/@nawawishkid/latest', {
	headers: {
		Accept: 'application/json'
	}
}).then(response => {
	console.log(response);
}).catch(error => {
	console.log(error.response);
});

document.querySelector('html').lang = config('app.language');