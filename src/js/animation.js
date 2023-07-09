"use strict"

const delay = (timeout) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};

// logo animation
const logo = document.querySelector('#logo');
const path = logo.querySelector('path');

const svgText = anime({
	targets: path,
	duration: 2000,
	delay: 200,
	easing: 'easeInOutExpo',
	strokeDashoffset: [anime.setDashoffset, 0]
});

svgText.finished
	.then(() => {
		logo.classList.add('hidden');
	})
	.then(() => delay(500))
	.then(() => {
		path.removeAttribute('stroke');
		path.setAttribute('fill', 'white');
	})
	.then(() => delay(300))
	.then(() => {
		logo.classList.remove('hidden');
	});


// form animatin
const items = document.querySelectorAll('.fields-item, .signup-block__btn');

animationFormEl(items, 'hidden');

async function animationFormEl(arr, cls) {
	for (let i = 0; i < arr.length; i++) {
		await delay(300);
		arr[i].classList.remove(cls);
	}
}