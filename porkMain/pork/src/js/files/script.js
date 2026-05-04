// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js'
// Підключення списку активних модулів
import { flsModules } from './modules.js'

window.onload = () => {
	const arr = document.querySelector('#arr')

	function iconForPayMethod() {
		const targetSvg = document.querySelector('.card-about__method.active svg')
		let cloneSvg = targetSvg.cloneNode(true)
		const cloneSvgBox = document.getElementById('iconOfMethod')
		cloneSvgBox.innerHTML = ''
		cloneSvgBox.appendChild(cloneSvg)
	}

	iconForPayMethod()

	const methodPayBtns = document.querySelectorAll('.card-about__method')
	if (methodPayBtns.length) {
		methodPayBtns.forEach((methodPayBtn) => {
			methodPayBtn.onclick = () => {
				methodPayBtns.forEach((methodPayBtn) => {
					methodPayBtn.classList.remove('active')
				})
				methodPayBtn.classList.add('active')
				iconForPayMethod()
			}
		})
	}
}
