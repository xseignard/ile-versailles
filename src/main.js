import Overlay from './overlay';
import './main.css';
import img1 from './img/1.jpg';
import img2 from './img/2.jpg';
import img3 from './img/3.jpg';
import img4 from './img/4.jpg';
import img5 from './img/5.jpg';
import img6 from './img/6.jpg';

const images = [img1, img2, img3, img4, img5, img6];

const content = document.querySelector('.content');
const slides = document.querySelectorAll('.slide');
let current = document.querySelector('.current');
const up = document.querySelector('.overlay-toggle.up');
const down = document.querySelector('.overlay-toggle.down');
const overlayElement = document.querySelector('.overlay');
const overlay = new Overlay(overlayElement);

document.body.style.backgroundImage = `url(${img1})`;
document.body.style.backgroundSize = 'cover';

const setBackground = index => {
	if (index !== 0) {
		document.body.style.backgroundColor = 'unset';
		document.body.style.backgroundImage = `url(${images[index - 1]})`;
		document.body.style.backgroundSize = 'cover';
	}
};

const toggleUp = () => {
	if (overlay.isAnimating) return false;
	overlay.toggle();
	current.classList.toggle('current');
	if (current.previousElementSibling) current = current.previousElementSibling;
	else current = content.lastElementChild;
	const index = parseInt(current.dataset.index, 10);
	setBackground(index);
	current.classList.toggle('current');
};

const toggleDown = () => {
	if (overlay.isAnimating) return false;
	overlay.toggle();
	current.classList.toggle('current');
	if (current.nextElementSibling) current = current.nextElementSibling;
	else current = content.firstElementChild;
	const index = parseInt(current.dataset.index, 10);
	setBackground(index);
	current.classList.toggle('current');
};

up.addEventListener('click', toggleUp);
down.addEventListener('click', toggleDown);
window.addEventListener('wheel', e => {
	if (e.deltaY > 80) toggleDown();
	else if (e.deltaY < -80) toggleUp();
});
// let start;
// let end;
// window.addEventListener('touchstart', e => {
// 	start = e.touches[0].clientY;
// });
// window.addEventListener('touchmove', e => {
// 	end = e.touches[0].clientY;
// });
// window.addEventListener('touchend', e => {
// 	if (start > end + 15) toggleUp();
// 	else if (start < end - 15) toggleDown();
// });
