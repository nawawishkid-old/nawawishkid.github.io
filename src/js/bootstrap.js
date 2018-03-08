import {config, Locale} from './utils';
import Axios from 'axios';

try {
	window.$ = window.jQuery = require('jquery');
	window.Popper = require('popper.js');

	require('bootstrap');
} catch (e) {}

document.querySelector('html').lang = config('app.language');