// Підключення функціоналу "Чертоги Фрілансера"
import { gotoBlock } from './scroll/gotoblock.js'
import { _slideToggle, isMobile, _slideUp } from './functions.js'
// Підключення списку активних модулів
import { flsModules } from './modules.js'

window.onload = () => {
	if (isMobile.any()) {
		const matchQuery = window.matchMedia('(max-width: 768px)')
		const parentEls = document.querySelectorAll('.menu__item--parent')

		if (matchQuery.matches) {
			parentEls.forEach((el) => {
				el.querySelector('.sub-menu').hidden = true
			})
		}

		document.onclick = (e) => {
			const button = e.target.classList.contains('menu__button')
			const tgtParentEl = e.target.closest('.menu__item--parent')

			parentEls.forEach((el) => {
				if (el.classList.contains('_open') && !(el === tgtParentEl)) {
					el.classList.remove('_open')

					if (matchQuery.matches) {
						_slideUp(el.querySelector('.sub-menu'))
					}
				}
			})

			if (button) {
				const subMenu = tgtParentEl.querySelector('.sub-menu')
				e.preventDefault()
				if (matchQuery.matches) {
					_slideToggle(subMenu)
				}
				tgtParentEl.classList.toggle('_open')
			}
		}
	}
}
