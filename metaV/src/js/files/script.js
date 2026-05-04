// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js"
// Підключення списку активних модулів
import { flsModules } from "./modules.js"

// function playVideo(video) {
// 	let overlay = video.nextElementSibling;
// 	let bottomOverlay = overlay.nextElementSibling;

// 	if (video.paused) {
// 		// Play video only if user interacted with the document
// 		video.play().catch(error => {
// 			console.error('Play video failed:', error);
// 		});
// 		overlay.style.display = 'none';
// 		bottomOverlay.style.display = 'none';
// 	} else {
// 		video.pause();
// 		overlay.style.display = 'flex';
// 		bottomOverlay.style.display = 'block';
// 	}

// 	// Add logic to show overlay and bottom overlay when video is paused
// 	video.addEventListener('pause', function () {
// 		overlay.style.display = 'flex';
// 		bottomOverlay.style.display = 'block';
// 	});
// }

// document.addEventListener('click', function (event) {
// 	if (!isTouchDevice() && event.target.classList.contains('play-button')) {
// 		event.preventDefault(); // Відмінити подію кліка за замовчуванням
// 		let video = event.target.parentNode.previousElementSibling;
// 		playVideo(video);
// 	}
// });

// document.addEventListener('touchend', function (event) {
// 	if (event.target.tagName === 'VIDEO') {
// 		event.stopPropagation(); // Зупинити подальше поширення події торкання
// 		let video = event.target;
// 		playVideo(video);
// 	} else if (event.target.classList.contains('play-button')) {
// 		event.preventDefault(); // Відмінити стандартну дію браузера
// 		let video = event.target.parentNode.previousElementSibling;
// 		playVideo(video);
// 	}
// });

// function isTouchDevice() {
// 	return 'ontouchstart' in window || navigator.maxTouchPoints;
// }



function toggleVideo(e) {
	const parentEl = e.target.closest(".activity__video")

	if (parentEl) {
		const video = parentEl.querySelector("video")

		if (video.paused) {
			video.play()
			video.setAttribute("controls", "")
			parentEl.classList.add("_playing")
			console.log('1');
		} else {
			video.pause()
			parentEl.classList.remove("_playing")
			video.removeAttribute("controls", "")
		}
	}
}

window.onload = () => {

	console.log(document.querySelector('.phase-pre-ready'));

	if(isMobile.any()){
		const videos = document.querySelectorAll('.bg-video')
	}

	document.addEventListener('click', function (e) {
		toggleVideo(e)
	})
}
