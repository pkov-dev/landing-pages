// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile, _slideDown, _slideUp, _slideToggle } from "./functions.js"
// Підключення списку активних модулів
import { flsModules } from "./modules.js"

window.onload = () => {
	const cards = document.querySelectorAll(".slide-services")

	const mediaQuery = window.matchMedia("(min-width: 992px)")

	if (mediaQuery.matches) {
		cards.forEach((card) => {
			_slideUp(card.querySelector(".slide-services__list"), 10)
		})

		const maxHeight = Math.max(...Array.from(cards, (card) => card.offsetHeight))
		cards.forEach((card) => {
			card.style.minHeight = `${maxHeight}px`
		})

		cards.forEach((card) => {
			card.addEventListener("mouseenter", () => {
				_slideDown(card.querySelector(".slide-services__list"), 200)
			})
			card.addEventListener("mouseleave", () => {
				_slideUp(card.querySelector(".slide-services__list"), 200)
			})
		})
	}
}
