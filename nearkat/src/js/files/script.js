// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js'
// Підключення списку активних модулів
import { flsModules } from './modules.js'
const heroSection = document.querySelector('.hero')
const parallaxItems = [
	{ element: document.querySelector('.hero__parallax-item--bg'), factor: 1.2 },
	{
		element: document.querySelector('.hero__parallax-item--title'),
		factor: 3,
	},
	{ element: document.querySelector('.hero__parallax-item--middle'), factor: 1.6 },
	{ element: document.querySelector('.hero__container'), factor: 4 },
]

const heroSectionHeight = heroSection.offsetHeight * 1.2
let lastScrollY = 0
let ticking = false

function updateParallax() {
	const scrollYPercent = Math.min(lastScrollY / heroSectionHeight, 1)

	parallaxItems.forEach(({ element, factor }) => {
		element.style.transform = `translateY(${(scrollYPercent * heroSectionHeight) / factor}px)`
	})

	ticking = false
}

function onScroll() {
	lastScrollY = window.scrollY

	if (!ticking && lastScrollY <= heroSectionHeight) {
		ticking = true
		requestAnimationFrame(updateParallax)
	}
}

window.addEventListener('scroll', onScroll)
