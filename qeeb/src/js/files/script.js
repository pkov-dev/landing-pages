// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js"
// Підключення списку активних модулів
import { flsModules } from "./modules.js"

class CircleText {
	constructor(parentAtr = "data-circle-text") {
		this.parentAtr = parentAtr
	}

	getPath() {
		const cxy = this.grandParent.offsetWidth / 2
		const radius = this.parentEl.offsetWidth / 2

		return (
			"M " +
			cxy +
			" " +
			cxy +
			" m -" +
			radius +
			", 0 a " +
			radius +
			"," +
			radius +
			" 0 1,1 " +
			radius * 2 +
			",0 a " +
			radius +
			"," +
			radius +
			" 0 1,1 -" +
			radius * 2 +
			",0"
		)
	}

	createSvg() {
		const path = this.getPath()

		this.id = `textPath-${Math.floor(Math.random() * 1e10)}`
		this.circleEl = `
		<svg class="circle">
		  <path id="${this.id}" d="${path}" fill="none" stroke-width="0"></path>
		  <g>
			<text text-anchor="start">
			  <textPath xlink:href="#${this.id}"  startOffset="0%">${this.text}</textPath>
			</text>
		  </g>
		</svg>`

		this.parentEl.insertAdjacentHTML("beforeend", this.circleEl)
	}

	resize(newPath) {
		this.pathEl = this.parentEl.querySelector(`#${this.id}`)
		this.pathEl.setAttribute("d", newPath)
	}

	textSvgInit() {
		this.parentEl = document.querySelector(`[${this.parentAtr}]`)

		if (this.parentEl) {
			this.grandParent = this.parentEl.parentElement
			this.text = this.parentEl.getAttribute(`${this.parentAtr}`)
			this.createSvg()

			const resizeObserver = new ResizeObserver(() => {
				this.resize(this.getPath())
			})

			resizeObserver.observe(this.parentEl)
		}
	}
}

function hideEls(el, countToShow) {
	const articles = el.querySelectorAll(".item-tabs")
	const count = countToShow || articles.length

	articles.forEach((element, index) => {
		element.style.display = index >= count ? "none" : ""
	})
}

window.onload = () => {
	const circleText = new CircleText()
	circleText.textSvgInit()

	const collectionsBlocks = document.querySelectorAll(".tabs__body")
	const matchFirst = window.matchMedia("(max-width: 1276.98px)")
	const matchThird = window.matchMedia("(min-width: 1277px)")
	const matchSecond = window.matchMedia("(max-width: 846px)")

	const changeCount = () => {
		collectionsBlocks.forEach((element) => {
			if (matchFirst.matches) {
				hideEls(element, 8)
			}
			if (matchSecond.matches) {
				hideEls(element, 3)
			}
			if (matchThird.matches) {
				hideEls(element)
			}
		})
	}

	matchFirst.addEventListener("change", changeCount)
	matchSecond.addEventListener("change", changeCount)
	matchThird.addEventListener("change", changeCount)

	changeCount()

}
