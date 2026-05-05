// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js'
// Підключення списку активних модулів
import { flsModules } from './modules.js'

const fileInpLabel = document.querySelector('.form__file-label span')
const inpFile = document.querySelector('.input--file')

if (fileInpLabel && inpFile) {
	inpFile.addEventListener('change', function () {
		if (inpFile.files.length === 1) {
			fileInpLabel.textContent = inpFile.files[0].name
			fileInpLabel.style.color = '#000'
		} else if (inpFile.files.length > 1) {
			fileInpLabel.textContent = `Choosed ${inpFile.files.length} files`
			fileInpLabel.style.color = '#000'
		} else {
			fileInpLabel.textContent = 'Choose file'
		}
	})
}

// const TOKEN = '7065999726:AAFOUjdsdUzv1TQEcRUy23JzY_3wVIChJ3k'
// const CHAT_ID = '-1002280401717'
// const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`
// const resultMessage = document.querySelector('.form__result-message')
// const form = document.getElementById('form')

// form.addEventListener('submit', function (e) {
// 	e.preventDefault()
// 	let message = `<b>New message from site</b>\n`
// 	message += `<b>User Name: </b> ${this.userName.value}\n`
// 	message += `<b>User Email: </b> ${this.userEmail.value}`

// 	axios
// 		.post(URI_API, {
// 			chat_id: CHAT_ID,
// 			parse_mode: 'html',
// 			text: message,
// 		})
// 		.then((res) => {
// 			this.userName.value = ''
// 			this.userEmail.value = ''
// 			resultMessage.innerText = 'Your information has been successfully sent'
// 			resultMessage.style.backgroundColor = '#90ee90'
// 			resultMessage.classList.remove('hidden')
// 			setTimeout(() => {
// 				resultMessage.classList.add('hidden')
// 			}, 6000)
// 		})
// 		.catch((err) => {
// 			resultMessage.innerText = 'Something went wrong. Please try again.'
// 			resultMessage.style.backgroundColor = '#ff4f4f'
// 			resultMessage.classList.remove('hidden')
// 			setTimeout(() => {
// 				resultMessage.classList.add('hidden')
// 			}, 6000)
// 		})
// })
