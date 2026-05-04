// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js'
// Підключення списку активних модулів
import { flsModules } from './modules.js'

document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('.form')
	const standart = document.querySelector('.form__switcher-button--standart')
	const privateBtn = document.querySelector('.form__switcher-button--private')

	if (form && standart && privateBtn) {
		privateBtn.addEventListener('click', () => {
			form.classList.add('private')
		})

		standart.addEventListener('click', () => {
			form.classList.remove('private')
		})
	}
})
