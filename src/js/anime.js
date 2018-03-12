import anime from 'animejs';

console.log('ANIMEJS');

console.log(anime);

let test = anime({
	targets: '#test',
	translateX: 250,
	duration: 2000,
	//loop: true
});

let page = anime({
	targets: '.react-app',
	scale: 0.8,
	duration: 300,
	delay: 500,
	easing: 'linear',
	autoplay: false,
});

/*anime({
	targets: '.composing-columns-column',
	translateX: (el, i, l) => {
		console.log(i, l);
		return 50 * i;
	},
	delay: 1000
});*/

window.addEventListener('scroll', () => {
	console.log('Scroll!');
});