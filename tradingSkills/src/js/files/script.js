// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js"
// Підключення списку активних модулів
import { flsModules } from "./modules.js"

// function processTextBlock(textBlock) {
// 	const dataChar = textBlock.dataset.typed.split(",").map(Number)
// 	const content = textBlock.textContent
// 	console.log(content.split("").length);
// 	textBlock.innerHTML = ""

// 	content.split("").forEach((char, i) => {
// 		const span = document.createElement("span")
// 		span.textContent = char

// 		if (char === " ") {
// 			const space = document.createTextNode(" ")
// 			textBlock.appendChild(space)
// 		} else {
// 			textBlock.appendChild(span)
// 			applyAnimation(span, dataChar, i)
// 		}
// 	})
// }

// function applyAnimation(span, dataChar, i) {
// 	if (dataChar.length) {
// 		const delayIncrement = dataChar[0] || 1000
// 		const delay = delayIncrement + i * (dataChar[1] || 50)

// 		Object.assign(span.style, {
// 			transitionProperty: "opacity",
// 			transitionDelay: delay + "ms",
// 		})
// 	}
// }

// function handleIntersection(entries, observer) {
// 	entries.forEach((entry) => {
// 		if (entry.isIntersecting) {
// 			const spans = entry.target.querySelectorAll("span")
// 			spans.forEach((element) => {
// 				element.style.opacity = 1
// 			})
// 			observer.unobserve(entry.target)
// 		}
// 	})
// }
function textType(element) {
	const textTypeElements = element ? [element] : document.querySelectorAll("[data-type]")

	textTypeElements.forEach((textTypeElement) => {
		textTypeItem(textTypeElement)
	})
}

function textTypeItem(text) {
	text.classList.add("typing")
	const textValue = text.textContent.trim()
	text.textContent = ""
	const textValueLength = textValue.length
	const textValueSpeed = text.dataset.type / textValueLength || 2000
	const textValueDelay = text.dataset.typeDelay || 0
	const textValueNext = text.dataset.textTypeNext ? document.querySelector(text.dataset.textTypeNext) : null

	setTimeout(() => {
		const startTime = performance.now()

		const addCharacter = (currentTime) => {
			const elapsedTime = currentTime - startTime
			const charactersToShow = Math.floor(elapsedTime / textValueSpeed) + 1

			if (charactersToShow <= textValueLength) {
				text.textContent = textValue.substring(0, charactersToShow)
				requestAnimationFrame((time) => addCharacter(time))
			} else {
				text.classList.add("done")
				textValueNext ? textType(textValueNext) : null
			}
		}

		requestAnimationFrame((time) => addCharacter(time))
	}, textValueDelay)
}

function callBack(entries, observer) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			textTypeItem(entry.target)
			observer.unobserve(entry.target)
		}
	})
}

window.onload = () => {
	const els = document.querySelectorAll("[data-type]")

	els.forEach((element) => {
		const observer = new IntersectionObserver(callBack, {
			root: null,
			rootMargin: "0px",
			threshold: 0.5,
		})

		observer.observe(element)
	})
}
