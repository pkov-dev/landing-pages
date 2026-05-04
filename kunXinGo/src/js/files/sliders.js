/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from "swiper"
import { Navigation, Grid } from "swiper/modules"
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss"
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector(".hero__slider")) {
		// Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper(".hero__slider", {
			// Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation],
			// observer: true,
			// observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			//autoHeight: true,
			speed: 800,

			// touchRatio: 0,
			//simulateTouch: false,
			// loop: true,
			//preloadImages: false,
			lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагінація
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: ".hero__button-prev",
				nextEl: ".hero__button-next",
			},
			/*
			// Брейкпоінти
			breakpoints: {
				640: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// Події
			on: {},
		})
	}
	if (document.querySelector(".services__slider")) {
		resizableSwiper("(max-width: 991.98px)", ".services__slider", {
			modules: [Navigation, Grid],
			navigation: {
				prevEl: ".services__button-prev",
				nextEl: ".services__button-next",
			},

			grid: {
				rows: 2,
			},

			spaceBetween: 24,

			breakpoints: {
				320: {
					slidesPerView: 1,
					grid: {
						rows: 1,
					},
				},
				700: {
					slidesPerView: 2,
				},
			},
		})
	}
	if (document.querySelector(".photos__slider")) {
		// Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper(".photos__slider", {
			// Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation],
			// observer: true,
			// observeParents: true,

			spaceBetween: 24,
			//autoHeight: true,
			speed: 800,

			// touchRatio: 0,
			//simulateTouch: false,
			// loop: true,
			//preloadImages: false,
			lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагінація
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: ".photos__button-prev",
				nextEl: ".photos__button-next",
			},

			// Брейкпоінти
			breakpoints: {
				320: {
					slidesPerView: 1.7,
					spaceBetween: 24,
				},

				480: {
					slidesPerView: 2.7,
				},
				768: {
					slidesPerView: 3.2,
				},
				992: {
					slidesPerView: 4,
				},
			},

			// Події
			on: {},
		})
	}
}

const resizableSwiper = (breakpoint, swiperClass, swiperSettings, callback) => {
	let swiper

	breakpoint = window.matchMedia(breakpoint)

	const enableSwiper = function (className, settings) {
		swiper = new Swiper(className, settings)

		if (callback) {
			callback(swiper)
		}
	}

	const checker = function () {
		if (breakpoint.matches) {
			return enableSwiper(swiperClass, swiperSettings)
		} else {
			if (swiper !== undefined) swiper.destroy(true, true)
			return
		}
	}

	breakpoint.addEventListener("change", checker)
	checker()
}

// const someFunc = (instance) => {
// 	if (instance) {
// 		instance.on("slideChange", function (e) {
// 			console.log("1")
// 		})
// 	}
// }

// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll(".swiper_scroll")
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index]
			const sliderScrollBar = sliderScrollItem.querySelector(".swiper-scrollbar")
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: "vertical",
				slidesPerView: "auto",
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false,
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			})
			sliderScroll.scrollbar.updateSize()
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск ініціалізації слайдерів
	initSliders()

	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
})
