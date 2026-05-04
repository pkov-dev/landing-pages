// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js"
// Підключення списку активних модулів
import { flsModules } from "./modules.js"

function setHeadH() {
	const header = document.querySelector(".header")

	if (header) {
		document.documentElement.style.setProperty("--headH", header.offsetHeight / 16 + "rem")
	}
}

window.onload = () => {
	const banner = document.querySelector(".header__top")
	let zoom = document.querySelectorAll(".image-zoom")

// banner logic
	setHeadH()
	if (banner) {
		banner.addEventListener("click", function (e) {
			if (e.target.closest(".top-header__button")) {
				banner.style.display = "none"
				setHeadH()
			}
		})
	}
	
// zoomy
	zoom.forEach(function (el) {
		el.addEventListener("click", function (e) {
			const target = e.target.closest(".image-zoom"),
				rect = target.getBoundingClientRect()
			target.classList.toggle("-active")
			target.style.setProperty("--image", `url(../${target.querySelector("img").getAttribute("src")})`)
			target.style.setProperty(
				"--x",
				Math.floor(((e.clientX - rect.left) / rect.width) * 100 * 100) / 100 + "%"
			)
			target.style.setProperty(
				"--y",
				Math.floor(((e.clientY - rect.top) / rect.height) * 100 * 100) / 100 + "%"
			)
			target.classList.toggle("-enter")
		})

		el.addEventListener("mouseenter", function (e) {
			const target = e.target.closest(".image-zoom")
			if (target.classList.contains("-active")) {
				target.classList.add("-enter")
			}
		})

		el.addEventListener("mousemove", function (e) {
			const target = e.target.closest(".image-zoom")
			if (target.classList.contains("-active")) {
				const rect = target.getBoundingClientRect()
				target.style.setProperty(
					"--x",
					Math.floor(((e.clientX - rect.left) / rect.width) * 100 * 100) / 100 + "%"
				)
				target.style.setProperty(
					"--y",
					Math.floor(((e.clientY - rect.top) / rect.height) * 100 * 100) / 100 + "%"
				)
			}
		})

		el.addEventListener("mouseleave", function (e) {
			let target = e.target.closest(".image-zoom")
			if (target.classList.contains("-active")) {
				target.classList.remove("-enter")
			}
		})
	})

}
