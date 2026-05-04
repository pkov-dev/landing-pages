/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper'
import { Navigation, Pagination, EffectCube, Autoplay } from 'swiper/modules'
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import '../../scss/base/swiper.scss'
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import "swiper/css"

// Ініціалізація слайдерів
function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.categories__slider')) {
		// Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.categories__slider', {
			// Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			spaceBetween: 15,

			//autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
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

			pagination: {
				el: '.categories__swiper-pagination',
				clickable: true,
				dynamicBullets: true,
				dynamicMainBullets: 3,
			},

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.categories__button-prev',
				nextEl: '.categories__button-next',
			},

			// Брейкпоінти
			breakpoints: {
				320: {
					slidesPerView: 1.2,
				},
				420: {
					slidesPerView: 2.2,
				},
				768: {
					slidesPerView: 3,
				},
				992: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
				1200: {
					slidesPerView: 5,
					spaceBetween: 30,
				},
				1440: {
					slidesPerView: 6,
				},
			},
		})
	}
	if (document.querySelector('.tranding__slider')) {
		// Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.tranding__slider', {
			// Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			spaceBetween: 15,
			//autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
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

			pagination: {
				el: '.tranding__swiper-pagination',
				clickable: true,
				dynamicBullets: true,
				dynamicMainBullets: 3,
			},

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.tranding__button-prev',
				nextEl: '.tranding__button-next',
			},

			// Брейкпоінти
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				575: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1250: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
		})
	}
	if (document.querySelector('.img-hero__slider')) {
		// Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.img-hero__slider', {
			// Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation, Pagination, EffectCube, Autoplay],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			// spaceBetween: 15,
			//autoHeight: true,
			speed: 2300,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			//preloadImages: false,
			// lazy: true,

			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 7000,
				disableOnInteraction: false,
			},

			effect: 'cube',
			effectCube: {
				slideShadows: false,
			},
			// Пагінація

			pagination: {
				el: '.tranding__swiper-pagination',
				clickable: true,
				dynamicBullets: true,
				dynamicMainBullets: 3,
			},

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Брейкпоінти
			// breakpoints: {

			// 	320: {
			// 		slidesPerView: 1,
			// 	},
			// 	575: {
			// 		slidesPerView: 2,
			// 	},
			// 	768: {
			// 		slidesPerView: 2,
			// 	},
			// 	992: {
			// 		slidesPerView: 3,
			// 		spaceBetween: 20,
			// 	},
			// 	1250: {
			// 		slidesPerView: 4,
			// 		spaceBetween: 30,
			// 	},
			// },
		})
	}
}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll')
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index]
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar')
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
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

window.addEventListener('load', function (e) {
	// Запуск ініціалізації слайдерів
	initSliders()
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
})
