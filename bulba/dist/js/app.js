(() => {
    "use strict";
    const modules_flsModules = {};
    let isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
        }
    };
    function addLoadedClass() {
        if (!document.documentElement.classList.contains("loading")) window.addEventListener("load", (function() {
            setTimeout((function() {
                document.documentElement.classList.add("loaded");
            }), 0);
        }));
    }
    function getHash() {
        if (location.hash) return location.hash.replace("#", "");
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = "";
                }));
                document.body.style.paddingRight = "";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            }));
            document.body.style.paddingRight = lockPaddingValue;
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function menuClose() {
        bodyUnlock();
        document.documentElement.classList.remove("menu-open");
    }
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    function copyTextToClipboard() {
        const copyButtons = document.querySelectorAll("[data-clipboardBtn]");
        if (copyButtons.length) copyButtons.forEach((copyButton => {
            copyButton.addEventListener("click", (() => {
                const copyElement = copyButton.closest("[data-clipboard]");
                if (copyElement) {
                    const textToCopy = copyElement.querySelector("[data-clipboardEl]").textContent.trim();
                    const hintEl = copyElement.querySelector("[data-cnHint]");
                    copyElement.classList.add("active");
                    async function copyText(textToCopy) {
                        try {
                            await navigator.clipboard.writeText(textToCopy);
                        } catch (error) {
                            hintEl.textContent = "Doesn't copied";
                        } finally {
                            setTimeout((() => {
                                copyElement.classList.remove("active");
                            }), 1e3);
                        }
                    }
                    copyText(textToCopy);
                }
            }));
        }));
    }
    function supportsHEVCAlpha() {
        const navigator = window.navigator;
        const ua = navigator.userAgent.toLowerCase();
        const hasMediaCapabilities = !!(navigator.mediaCapabilities && navigator.mediaCapabilities.decodingInfo);
        const isSafari = ua.indexOf("safari") != -1 && !(ua.indexOf("chrome") != -1) && ua.indexOf("version/") != -1;
        return isSafari && hasMediaCapabilities;
    }
    function isIE11() {
        return !!window.navigator.userAgent.match(/Trident\/7\./, []);
    }
    if (!isIE11()) {
        const videos = document.querySelectorAll("video");
        if (supportsHEVCAlpha()) videos.forEach((video => {
            let srcValue = video.getAttribute("src");
            srcValue += "mov";
            video.setAttribute("src", srcValue);
            video.setAttribute("type", "video/quicktime");
        })); else videos.forEach((video => {
            let srcValue = video.getAttribute("src");
            srcValue += "webm";
            video.setAttribute("src", srcValue);
        }));
    }
    let gotoblock_gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
        const targetBlockElement = document.querySelector(targetBlock);
        if (targetBlockElement) {
            let headerItem = "";
            let headerItemHeight = 0;
            if (noHeader) {
                headerItem = "header.header";
                const headerElement = document.querySelector(headerItem);
                if (!headerElement.classList.contains("_header-scroll")) {
                    headerElement.style.cssText = `transition-duration: 0s;`;
                    headerElement.classList.add("_header-scroll");
                    headerItemHeight = headerElement.offsetHeight;
                    headerElement.classList.remove("_header-scroll");
                    setTimeout((() => {
                        headerElement.style.cssText = ``;
                    }), 0);
                } else headerItemHeight = headerElement.offsetHeight;
            }
            let options = {
                speedAsDuration: true,
                speed,
                header: headerItem,
                offset: offsetTop,
                easing: "easeOutQuad"
            };
            document.documentElement.classList.contains("menu-open") ? menuClose() : null;
            if (typeof SmoothScroll !== "undefined") (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
                let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
                targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
                targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
                window.scrollTo({
                    top: targetBlockElementPosition,
                    behavior: "smooth"
                });
            }
            functions_FLS(`[gotoBlock]: Юхуу...їдемо до ${targetBlock}`);
        } else functions_FLS(`[gotoBlock]: Йой... Такого блоку немає на сторінці: ${targetBlock}`);
    };
    class ScrollWatcher {
        constructor(props) {
            let defaultConfig = {
                logging: true
            };
            this.config = Object.assign(defaultConfig, props);
            this.observer;
            !document.documentElement.classList.contains("watcher") ? this.scrollWatcherRun() : null;
        }
        scrollWatcherUpdate() {
            this.scrollWatcherRun();
        }
        scrollWatcherRun() {
            document.documentElement.classList.add("watcher");
            this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
        }
        scrollWatcherConstructor(items) {
            if (items.length) {
                this.scrollWatcherLogging(`Прокинувся, стежу за об'єктами (${items.length})...`);
                let uniqParams = uniqArray(Array.from(items).map((function(item) {
                    if (item.dataset.watch === "navigator" && !item.dataset.watchThreshold) {
                        let valueOfThreshold;
                        if (item.clientHeight > 2) {
                            valueOfThreshold = window.innerHeight / 2 / (item.clientHeight - 1);
                            if (valueOfThreshold > 1) valueOfThreshold = 1;
                        } else valueOfThreshold = 1;
                        item.setAttribute("data-watch-threshold", valueOfThreshold.toFixed(2));
                    }
                    return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : "0px"}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
                })));
                uniqParams.forEach((uniqParam => {
                    let uniqParamArray = uniqParam.split("|");
                    let paramsWatch = {
                        root: uniqParamArray[0],
                        margin: uniqParamArray[1],
                        threshold: uniqParamArray[2]
                    };
                    let groupItems = Array.from(items).filter((function(item) {
                        let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
                        let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : "0px";
                        let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
                        if (String(watchRoot) === paramsWatch.root && String(watchMargin) === paramsWatch.margin && String(watchThreshold) === paramsWatch.threshold) return item;
                    }));
                    let configWatcher = this.getScrollWatcherConfig(paramsWatch);
                    this.scrollWatcherInit(groupItems, configWatcher);
                }));
            } else this.scrollWatcherLogging("Сплю, немає об'єктів для стеження. ZzzZZzz");
        }
        getScrollWatcherConfig(paramsWatch) {
            let configWatcher = {};
            if (document.querySelector(paramsWatch.root)) configWatcher.root = document.querySelector(paramsWatch.root); else if (paramsWatch.root !== "null") this.scrollWatcherLogging(`Эмм... батьківського об'єкта ${paramsWatch.root} немає на сторінці`);
            configWatcher.rootMargin = paramsWatch.margin;
            if (paramsWatch.margin.indexOf("px") < 0 && paramsWatch.margin.indexOf("%") < 0) {
                this.scrollWatcherLogging(`йой, налаштування data-watch-margin потрібно задавати в PX або %`);
                return;
            }
            if (paramsWatch.threshold === "prx") {
                paramsWatch.threshold = [];
                for (let i = 0; i <= 1; i += .005) paramsWatch.threshold.push(i);
            } else paramsWatch.threshold = paramsWatch.threshold.split(",");
            configWatcher.threshold = paramsWatch.threshold;
            return configWatcher;
        }
        scrollWatcherCreate(configWatcher) {
            this.observer = new IntersectionObserver(((entries, observer) => {
                entries.forEach((entry => {
                    this.scrollWatcherCallback(entry, observer);
                }));
            }), configWatcher);
        }
        scrollWatcherInit(items, configWatcher) {
            this.scrollWatcherCreate(configWatcher);
            items.forEach((item => this.observer.observe(item)));
        }
        scrollWatcherIntersecting(entry, targetElement) {
            if (entry.isIntersecting) {
                !targetElement.classList.contains("_watcher-view") ? targetElement.classList.add("_watcher-view") : null;
                this.scrollWatcherLogging(`Я бачу ${targetElement.classList}, додав клас _watcher-view`);
            } else {
                targetElement.classList.contains("_watcher-view") ? targetElement.classList.remove("_watcher-view") : null;
                this.scrollWatcherLogging(`Я не бачу ${targetElement.classList}, прибрав клас _watcher-view`);
            }
        }
        scrollWatcherOff(targetElement, observer) {
            observer.unobserve(targetElement);
            this.scrollWatcherLogging(`Я перестав стежити за ${targetElement.classList}`);
        }
        scrollWatcherLogging(message) {
            this.config.logging ? functions_FLS(`[Спостерігач]: ${message}`) : null;
        }
        scrollWatcherCallback(entry, observer) {
            const targetElement = entry.target;
            this.scrollWatcherIntersecting(entry, targetElement);
            targetElement.hasAttribute("data-watch-once") && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
            document.dispatchEvent(new CustomEvent("watcherCallback", {
                detail: {
                    entry
                }
            }));
        }
    }
    modules_flsModules.watcher = new ScrollWatcher({});
    let addWindowScrollEvent = false;
    function pageNavigation() {
        document.addEventListener("click", pageNavigationAction);
        document.addEventListener("watcherCallback", pageNavigationAction);
        function pageNavigationAction(e) {
            if (e.type === "click") {
                const targetElement = e.target;
                if (targetElement.closest("[data-goto]")) {
                    const gotoLink = targetElement.closest("[data-goto]");
                    const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
                    const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
                    const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
                    const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
                    if (modules_flsModules.fullpage) {
                        const fullpageSection = document.querySelector(`${gotoLinkSelector}`).closest("[data-fp-section]");
                        const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.fpId : null;
                        if (fullpageSectionId !== null) {
                            modules_flsModules.fullpage.switchingSection(fullpageSectionId);
                            document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                        }
                    } else gotoblock_gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
                    e.preventDefault();
                }
            } else if (e.type === "watcherCallback" && e.detail) {
                const entry = e.detail.entry;
                const targetElement = entry.target;
                if (targetElement.dataset.watch === "navigator") {
                    document.querySelector(`[data-goto]._navigator-active`);
                    let navigatorCurrentItem;
                    if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`); else if (targetElement.classList.length) for (let index = 0; index < targetElement.classList.length; index++) {
                        const element = targetElement.classList[index];
                        if (document.querySelector(`[data-goto=".${element}"]`)) {
                            navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
                            break;
                        }
                    }
                    if (entry.isIntersecting) navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null; else navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
                }
            }
        }
        if (getHash()) {
            let goToHash;
            if (document.querySelector(`#${getHash()}`)) goToHash = `#${getHash()}`; else if (document.querySelector(`.${getHash()}`)) goToHash = `.${getHash()}`;
            goToHash ? gotoblock_gotoBlock(goToHash, true, 500, 20) : null;
        }
    }
    function headerScroll() {
        addWindowScrollEvent = true;
        const header = document.querySelector("header.header");
        const headerShow = header.hasAttribute("data-scroll-show");
        const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
        const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
        let scrollDirection = 0;
        let timer;
        document.addEventListener("windowScroll", (function(e) {
            const scrollTop = window.scrollY;
            clearTimeout(timer);
            if (scrollTop >= startPoint) {
                !header.classList.contains("_header-scroll") ? header.classList.add("_header-scroll") : null;
                if (headerShow) {
                    if (scrollTop > scrollDirection) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null; else !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                    timer = setTimeout((() => {
                        !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                    }), headerShowTimer);
                }
            } else {
                header.classList.contains("_header-scroll") ? header.classList.remove("_header-scroll") : null;
                if (headerShow) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null;
            }
            scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
        }));
    }
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    function t(t, e, i) {
        return Math.max(t, Math.min(e, i));
    }
    class Animate {
        advance(e) {
            if (!this.isRunning) return;
            let i = !1;
            if (this.lerp) this.value = (s = this.value, o = this.to, n = 60 * this.lerp, r = e, 
            function(t, e, i) {
                return (1 - i) * t + i * e;
            }(s, o, 1 - Math.exp(-n * r))), Math.round(this.value) === this.to && (this.value = this.to, 
            i = !0); else {
                this.currentTime += e;
                const s = t(0, this.currentTime / this.duration, 1);
                i = s >= 1;
                const o = i ? 1 : this.easing(s);
                this.value = this.from + (this.to - this.from) * o;
            }
            var s, o, n, r;
            this.onUpdate?.(this.value, i), i && this.stop();
        }
        stop() {
            this.isRunning = !1;
        }
        fromTo(t, e, {lerp: i = .1, duration: s = 1, easing: o = t => t, onStart: n, onUpdate: r}) {
            this.from = this.value = t, this.to = e, this.lerp = i, this.duration = s, this.easing = o, 
            this.currentTime = 0, this.isRunning = !0, n?.(), this.onUpdate = r;
        }
    }
    class Dimensions {
        constructor({wrapper: t, content: e, autoResize: i = !0, debounce: s = 250} = {}) {
            this.wrapper = t, this.content = e, i && (this.debouncedResize = function(t, e) {
                let i;
                return function() {
                    let s = arguments, o = this;
                    clearTimeout(i), i = setTimeout((function() {
                        t.apply(o, s);
                    }), e);
                };
            }(this.resize, s), this.wrapper === window ? window.addEventListener("resize", this.debouncedResize, !1) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), 
            this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), 
            this.contentResizeObserver.observe(this.content)), this.resize();
        }
        destroy() {
            this.wrapperResizeObserver?.disconnect(), this.contentResizeObserver?.disconnect(), 
            window.removeEventListener("resize", this.debouncedResize, !1);
        }
        resize=() => {
            this.onWrapperResize(), this.onContentResize();
        };
        onWrapperResize=() => {
            this.wrapper === window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, 
            this.height = this.wrapper.clientHeight);
        };
        onContentResize=() => {
            this.wrapper === window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, 
            this.scrollWidth = this.wrapper.scrollWidth);
        };
        get limit() {
            return {
                x: this.scrollWidth - this.width,
                y: this.scrollHeight - this.height
            };
        }
    }
    class Emitter {
        constructor() {
            this.events = {};
        }
        emit(t, ...e) {
            let i = this.events[t] || [];
            for (let t = 0, s = i.length; t < s; t++) i[t](...e);
        }
        on(t, e) {
            return this.events[t]?.push(e) || (this.events[t] = [ e ]), () => {
                this.events[t] = this.events[t]?.filter((t => e !== t));
            };
        }
        off(t, e) {
            this.events[t] = this.events[t]?.filter((t => e !== t));
        }
        destroy() {
            this.events = {};
        }
    }
    const e = 100 / 6;
    class VirtualScroll {
        constructor(t, {wheelMultiplier: e = 1, touchMultiplier: i = 1}) {
            this.element = t, this.wheelMultiplier = e, this.touchMultiplier = i, this.touchStart = {
                x: null,
                y: null
            }, this.emitter = new Emitter, window.addEventListener("resize", this.onWindowResize, !1), 
            this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, {
                passive: !1
            }), this.element.addEventListener("touchstart", this.onTouchStart, {
                passive: !1
            }), this.element.addEventListener("touchmove", this.onTouchMove, {
                passive: !1
            }), this.element.addEventListener("touchend", this.onTouchEnd, {
                passive: !1
            });
        }
        on(t, e) {
            return this.emitter.on(t, e);
        }
        destroy() {
            this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize, !1), 
            this.element.removeEventListener("wheel", this.onWheel, {
                passive: !1
            }), this.element.removeEventListener("touchstart", this.onTouchStart, {
                passive: !1
            }), this.element.removeEventListener("touchmove", this.onTouchMove, {
                passive: !1
            }), this.element.removeEventListener("touchend", this.onTouchEnd, {
                passive: !1
            });
        }
        onTouchStart=t => {
            const {clientX: e, clientY: i} = t.targetTouches ? t.targetTouches[0] : t;
            this.touchStart.x = e, this.touchStart.y = i, this.lastDelta = {
                x: 0,
                y: 0
            }, this.emitter.emit("scroll", {
                deltaX: 0,
                deltaY: 0,
                event: t
            });
        };
        onTouchMove=t => {
            const {clientX: e, clientY: i} = t.targetTouches ? t.targetTouches[0] : t, s = -(e - this.touchStart.x) * this.touchMultiplier, o = -(i - this.touchStart.y) * this.touchMultiplier;
            this.touchStart.x = e, this.touchStart.y = i, this.lastDelta = {
                x: s,
                y: o
            }, this.emitter.emit("scroll", {
                deltaX: s,
                deltaY: o,
                event: t
            });
        };
        onTouchEnd=t => {
            this.emitter.emit("scroll", {
                deltaX: this.lastDelta.x,
                deltaY: this.lastDelta.y,
                event: t
            });
        };
        onWheel=t => {
            let {deltaX: i, deltaY: s, deltaMode: o} = t;
            i *= 1 === o ? e : 2 === o ? this.windowWidth : 1, s *= 1 === o ? e : 2 === o ? this.windowHeight : 1, 
            i *= this.wheelMultiplier, s *= this.wheelMultiplier, this.emitter.emit("scroll", {
                deltaX: i,
                deltaY: s,
                event: t
            });
        };
        onWindowResize=() => {
            this.windowWidth = window.innerWidth, this.windowHeight = window.innerHeight;
        };
    }
    class Lenis {
        constructor({wrapper: t = window, content: e = document.documentElement, wheelEventsTarget: i = t, eventsTarget: s = i, smoothWheel: o = !0, syncTouch: n = !1, syncTouchLerp: r = .075, touchInertiaMultiplier: l = 35, duration: h, easing: a = t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), lerp: c = !h && .1, infinite: d = !1, orientation: p = "vertical", gestureOrientation: u = "vertical", touchMultiplier: m = 1, wheelMultiplier: v = 1, autoResize: g = !0, __experimental__naiveDimensions: S = !1} = {}) {
            this.__isSmooth = !1, this.__isScrolling = !1, this.__isStopped = !1, this.__isLocked = !1, 
            this.onVirtualScroll = ({deltaX: t, deltaY: e, event: i}) => {
                if (i.ctrlKey) return;
                const s = i.type.includes("touch"), o = i.type.includes("wheel");
                if (this.options.syncTouch && s && "touchstart" === i.type && !this.isStopped && !this.isLocked) return void this.reset();
                const n = 0 === t && 0 === e, r = "vertical" === this.options.gestureOrientation && 0 === e || "horizontal" === this.options.gestureOrientation && 0 === t;
                if (n || r) return;
                let l = i.composedPath();
                if (l = l.slice(0, l.indexOf(this.rootElement)), l.find((t => {
                    var e, i, n, r, l;
                    return (null === (e = t.hasAttribute) || void 0 === e ? void 0 : e.call(t, "data-lenis-prevent")) || s && (null === (i = t.hasAttribute) || void 0 === i ? void 0 : i.call(t, "data-lenis-prevent-touch")) || o && (null === (n = t.hasAttribute) || void 0 === n ? void 0 : n.call(t, "data-lenis-prevent-wheel")) || (null === (r = t.classList) || void 0 === r ? void 0 : r.contains("lenis")) && !(null === (l = t.classList) || void 0 === l ? void 0 : l.contains("lenis-stopped"));
                }))) return;
                if (this.isStopped || this.isLocked) return void i.preventDefault();
                if (this.isSmooth = this.options.syncTouch && s || this.options.smoothWheel && o, 
                !this.isSmooth) return this.isScrolling = !1, void this.animate.stop();
                i.preventDefault();
                let h = e;
                "both" === this.options.gestureOrientation ? h = Math.abs(e) > Math.abs(t) ? e : t : "horizontal" === this.options.gestureOrientation && (h = t);
                const a = s && this.options.syncTouch, c = s && "touchend" === i.type && Math.abs(h) > 5;
                c && (h = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + h, Object.assign({
                    programmatic: !1
                }, a ? {
                    lerp: c ? this.options.syncTouchLerp : 1
                } : {
                    lerp: this.options.lerp,
                    duration: this.options.duration,
                    easing: this.options.easing
                }));
            }, this.onNativeScroll = () => {
                if (!this.__preventNextScrollEvent && !this.isScrolling) {
                    const t = this.animatedScroll;
                    this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, 
                    this.direction = Math.sign(this.animatedScroll - t), this.emit();
                }
            }, window.lenisVersion = "1.0.42", t !== document.documentElement && t !== document.body || (t = window), 
            this.options = {
                wrapper: t,
                content: e,
                wheelEventsTarget: i,
                eventsTarget: s,
                smoothWheel: o,
                syncTouch: n,
                syncTouchLerp: r,
                touchInertiaMultiplier: l,
                duration: h,
                easing: a,
                lerp: c,
                infinite: d,
                gestureOrientation: u,
                orientation: p,
                touchMultiplier: m,
                wheelMultiplier: v,
                autoResize: g,
                __experimental__naiveDimensions: S
            }, this.animate = new Animate, this.emitter = new Emitter, this.dimensions = new Dimensions({
                wrapper: t,
                content: e,
                autoResize: g
            }), this.toggleClassName("lenis", !0), this.velocity = 0, this.isLocked = !1, this.isStopped = !1, 
            this.isSmooth = n || o, this.isScrolling = !1, this.targetScroll = this.animatedScroll = this.actualScroll, 
            this.options.wrapper.addEventListener("scroll", this.onNativeScroll, !1), this.virtualScroll = new VirtualScroll(s, {
                touchMultiplier: m,
                wheelMultiplier: v
            }), this.virtualScroll.on("scroll", this.onVirtualScroll);
        }
        destroy() {
            this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, !1), 
            this.virtualScroll.destroy(), this.dimensions.destroy(), this.toggleClassName("lenis", !1), 
            this.toggleClassName("lenis-smooth", !1), this.toggleClassName("lenis-scrolling", !1), 
            this.toggleClassName("lenis-stopped", !1), this.toggleClassName("lenis-locked", !1);
        }
        on(t, e) {
            return this.emitter.on(t, e);
        }
        off(t, e) {
            return this.emitter.off(t, e);
        }
        setScroll(t) {
            this.isHorizontal ? this.rootElement.scrollLeft = t : this.rootElement.scrollTop = t;
        }
        resize() {
            this.dimensions.resize();
        }
        emit() {
            this.emitter.emit("scroll", this);
        }
        reset() {
            this.isLocked = !1, this.isScrolling = !1, this.animatedScroll = this.targetScroll = this.actualScroll, 
            this.velocity = 0, this.animate.stop();
        }
        start() {
            this.isStopped && (this.isStopped = !1, this.reset());
        }
        stop() {
            this.isStopped || (this.isStopped = !0, this.animate.stop(), this.reset());
        }
        raf(t) {
            const e = t - (this.time || t);
            this.time = t, this.animate.advance(.001 * e);
        }
        scrollTo(e, {offset: i = 0, immediate: s = !1, lock: o = !1, duration: n = this.options.duration, easing: r = this.options.easing, lerp: l = !n && this.options.lerp, onComplete: h, force: a = !1, programmatic: c = !0} = {}) {
            if (!this.isStopped && !this.isLocked || a) {
                if ([ "top", "left", "start" ].includes(e)) e = 0; else if ([ "bottom", "right", "end" ].includes(e)) e = this.limit; else {
                    let t;
                    if ("string" == typeof e ? t = document.querySelector(e) : (null == e ? void 0 : e.nodeType) && (t = e), 
                    t) {
                        if (this.options.wrapper !== window) {
                            const t = this.options.wrapper.getBoundingClientRect();
                            i -= this.isHorizontal ? t.left : t.top;
                        }
                        const s = t.getBoundingClientRect();
                        e = (this.isHorizontal ? s.left : s.top) + this.animatedScroll;
                    }
                }
                if ("number" == typeof e) {
                    if (e += i, e = Math.round(e), this.options.infinite ? c && (this.targetScroll = this.animatedScroll = this.scroll) : e = t(0, e, this.limit), 
                    s) return this.animatedScroll = this.targetScroll = e, this.setScroll(this.scroll), 
                    this.reset(), void (null == h || h(this));
                    if (!c) {
                        if (e === this.targetScroll) return;
                        this.targetScroll = e;
                    }
                    this.animate.fromTo(this.animatedScroll, e, {
                        duration: n,
                        easing: r,
                        lerp: l,
                        onStart: () => {
                            o && (this.isLocked = !0), this.isScrolling = !0;
                        },
                        onUpdate: (t, e) => {
                            this.isScrolling = !0, this.velocity = t - this.animatedScroll, this.direction = Math.sign(this.velocity), 
                            this.animatedScroll = t, this.setScroll(this.scroll), c && (this.targetScroll = t), 
                            e || this.emit(), e && (this.reset(), this.emit(), null == h || h(this), this.__preventNextScrollEvent = !0, 
                            requestAnimationFrame((() => {
                                delete this.__preventNextScrollEvent;
                            })));
                        }
                    });
                }
            }
        }
        get rootElement() {
            return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
        }
        get limit() {
            return this.options.__experimental__naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
        }
        get isHorizontal() {
            return "horizontal" === this.options.orientation;
        }
        get actualScroll() {
            return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop;
        }
        get scroll() {
            return this.options.infinite ? (t = this.animatedScroll, e = this.limit, (t % e + e) % e) : this.animatedScroll;
            var t, e;
        }
        get progress() {
            return 0 === this.limit ? 1 : this.scroll / this.limit;
        }
        get isSmooth() {
            return this.__isSmooth;
        }
        set isSmooth(t) {
            this.__isSmooth !== t && (this.__isSmooth = t, this.toggleClassName("lenis-smooth", t));
        }
        get isScrolling() {
            return this.__isScrolling;
        }
        set isScrolling(t) {
            this.__isScrolling !== t && (this.__isScrolling = t, this.toggleClassName("lenis-scrolling", t));
        }
        get isStopped() {
            return this.__isStopped;
        }
        set isStopped(t) {
            this.__isStopped !== t && (this.__isStopped = t, this.toggleClassName("lenis-stopped", t));
        }
        get isLocked() {
            return this.__isLocked;
        }
        set isLocked(t) {
            this.__isLocked !== t && (this.__isLocked = t, this.toggleClassName("lenis-locked", t));
        }
        get className() {
            let t = "lenis";
            return this.isStopped && (t += " lenis-stopped"), this.isLocked && (t += " lenis-locked"), 
            this.isScrolling && (t += " lenis-scrolling"), this.isSmooth && (t += " lenis-smooth"), 
            t;
        }
        toggleClassName(t, e) {
            this.rootElement.classList.toggle(t, e), this.emitter.emit("className change", this);
        }
    }
    window.onRefreshLenisScroll = () => {
        window.lenis?.destroy();
        setTimeout((() => {
            window.lenis = new Lenis({
                eventsTarget: document.querySelector("main"),
                duration: 1.2,
                infinite: false,
                autoResize: true
            });
            function raf(time) {
                window.lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        }), 0);
    };
    isMobile.any() ? "" : window.onRefreshLenisScroll();
    addLoadedClass();
    menuInit();
    copyTextToClipboard();
    pageNavigation();
    headerScroll();
})();