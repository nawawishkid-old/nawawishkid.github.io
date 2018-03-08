function Locale() {
	//console.log('Locale()');

	this.locale = require('../../locale/locale.json');

	this.getLang = function() {
		return document.querySelector('html').lang || 'en_US';
	}

	this.getLocales = function() {
		return this.locale;
	}

	this.get = function(keyword) {
		return this.locale[this.getLang()][keyword];
	}
}

export default Locale;