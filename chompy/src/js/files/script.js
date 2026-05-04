// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js'
// Підключення списку активних модулів
import { flsModules } from './modules.js'

class Bubble {
	constructor(snowflakesNumber) {
		this.snowflakesNumber = snowflakesNumber
	}

	getRandomNumber(min = 0, max = 100) {
		return min + Math.floor(Math.random() * (max - min + 1))
	}

	showSnow(step = 0.2, maxTopPOsition = 100, minTopPosition = -10, minInterval = 10, maxInterval = 40) {
		for (const lake of this.snowContainer.children) {
			let topPosition = this.getRandomNumber(-30, -5)
			setInterval(
				() => {
					topPosition += step
					lake.style.bottom = topPosition + '%'
					if (topPosition >= maxTopPOsition) topPosition = minTopPosition
				},
				this.getRandomNumber(minInterval, maxInterval)
			)
		}
	}

	render(containerSelector, imgSrc, minLakeSize = 20, maxLakeSize = 50) {
		if (containerSelector) this.snowContainer = document.querySelector(containerSelector)

		for (let i = 0; i < this.snowflakesNumber; i++) {
			const lake = document.createElement('img')
			lake.setAttribute('src', imgSrc)
			lake.setAttribute('alt', '')

			const lakeSize = this.getRandomNumber(minLakeSize, maxLakeSize) + 'px'
			lake.style.width = lakeSize
			lake.style.height = lakeSize
			lake.style.left = this.getRandomNumber() + '%'
			lake.className = 'bubble'

			this.snowContainer.append(lake)
		}
		this.showSnow()
	}
}

const playButton = document.getElementById('play-btn')
const video = document.getElementById('video')

function togglePlay() {
	if (video.classList.contains('play')) {
		video.pause()
		video.classList.remove('play')
		playButton.classList.remove('hidden')
	} else {
		video.play()
		video.classList.add('play')
		playButton.classList.add('hidden')
	}
}

window.onload = function () {
	const bubble = new Bubble(10)
	bubble.render('.about__bubbles-wrapper', 'img/about/bubble.webp')
	bubble.render('.join__bubbles-wrapper', 'img/joinUs/bubble.webp')

	// video.addEventListener('click', togglePlay)
	// playButton.addEventListener('click', togglePlay)
}
