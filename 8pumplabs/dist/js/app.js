(() => {
    "use strict";
    const modules_flsModules = {};
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
    class Parallax {
        constructor(elements) {
            if (elements.length) this.elements = Array.from(elements).map((el => new Parallax.Each(el, this.options)));
        }
        destroyEvents() {
            this.elements.forEach((el => {
                el.destroyEvents();
            }));
        }
        setEvents() {
            this.elements.forEach((el => {
                el.setEvents();
            }));
        }
    }
    Parallax.Each = class {
        constructor(parent) {
            this.parent = parent;
            this.elements = this.parent.querySelectorAll("[data-prlx]");
            this.animation = this.animationFrame.bind(this);
            this.offset = 0;
            this.value = 0;
            this.smooth = parent.dataset.prlxSmooth ? Number(parent.dataset.prlxSmooth) : 15;
            this.setEvents();
        }
        setEvents() {
            this.animationID = window.requestAnimationFrame(this.animation);
        }
        destroyEvents() {
            window.cancelAnimationFrame(this.animationID);
        }
        animationFrame() {
            const topToWindow = this.parent.getBoundingClientRect().top;
            const heightParent = this.parent.offsetHeight;
            const heightWindow = window.innerHeight;
            const positionParent = {
                top: topToWindow - heightWindow,
                bottom: topToWindow + heightParent
            };
            const centerPoint = this.parent.dataset.prlxCenter ? this.parent.dataset.prlxCenter : "center";
            if (positionParent.top < 30 && positionParent.bottom > -30) switch (centerPoint) {
              case "top":
                this.offset = -1 * topToWindow;
                break;

              case "center":
                this.offset = heightWindow / 2 - (topToWindow + heightParent / 2);
                break;

              case "bottom":
                this.offset = heightWindow - (topToWindow + heightParent);
                break;
            }
            this.value += (this.offset - this.value) / this.smooth;
            this.animationID = window.requestAnimationFrame(this.animation);
            this.elements.forEach((el => {
                const parameters = {
                    axis: el.dataset.axis ? el.dataset.axis : "v",
                    direction: el.dataset.direction ? el.dataset.direction + "1" : "-1",
                    coefficient: el.dataset.coefficient ? Number(el.dataset.coefficient) : 5,
                    additionalProperties: el.dataset.properties ? el.dataset.properties : ""
                };
                this.parameters(el, parameters);
            }));
        }
        parameters(el, parameters) {
            if (parameters.axis == "v") el.style.transform = `translate3D(0, ${(parameters.direction * (this.value / parameters.coefficient)).toFixed(2)}px,0) ${parameters.additionalProperties}`; else if (parameters.axis == "h") el.style.transform = `translate3D(${(parameters.direction * (this.value / parameters.coefficient)).toFixed(2)}px,0,0) ${parameters.additionalProperties}`;
        }
    };
    if (document.querySelectorAll("[data-prlx-parent]")) modules_flsModules.parallax = new Parallax(document.querySelectorAll("[data-prlx-parent]"));
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
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    class Counter {
        constructor(counterAtr) {
            this.counterAtr = counterAtr || "data-counter";
        }
        callBack(entries) {
            entries.forEach((entry => {
                const counterEl = entry.target;
                const counter = this.counters.find((counter => counter.counterEl === counterEl));
                if (entry.isIntersecting) if (!counter.isAnimated) {
                    counter.startCounter();
                    if (!counter.repeat) {
                        counter.isAnimated = true;
                        this.observer.unobserve(counterEl);
                    }
                }
            }));
        }
        observe(element) {
            const options = {
                root: null,
                rootMargin: "0px 0px 0px 0px",
                threshold: .5
            };
            this.observer = new IntersectionObserver(this.callBack.bind(this), options);
            this.observer.observe(element);
        }
        counterInit() {
            const counterElements = document.querySelectorAll(`[${this.counterAtr}]`);
            this.counters = [];
            if (counterElements.length) counterElements.forEach((counter => {
                const newCounter = new CounterInstance(counter, this.counterAtr);
                this.counters.push(newCounter);
                newCounter.initCounter();
                this.observe(counter);
            }));
        }
    }
    class CounterInstance {
        constructor(counterEl, counterAtr, parentAtrName, repeatAtrName, separatorAtrName) {
            this.counterAtr = counterAtr;
            this.parentAtrName = parentAtrName || "data-circle-wrap";
            this.repeatAtrName = repeatAtrName || "data-repeat";
            this.separatorAtrName = separatorAtrName || "data-separator";
            this.counterEl = counterEl;
            this.parentEl = this.counterEl.closest(`[${this.parentAtrName}]`);
            this.isAnimated = false;
        }
        setWidth() {
            const width = this.counterEl.offsetWidth;
            const fontSize = parseFloat(getComputedStyle(this.counterEl).fontSize);
            this.counterEl.style.minWidth = (width + this.range) / fontSize + "em";
        }
        getCounterValues() {
            const counterValues = this.counterEl.getAttribute(this.counterAtr);
            let custValue = this.counterEl.textContent.trim() || 0;
            const [customTime, customRange] = counterValues.split(",").map((value => parseFloat(value.trim(), 10)));
            this.time = customTime * 1e3 || 1e3;
            this.range = customRange || 0;
            this.value = parseInt(this.initSeparator(custValue));
            if (this.counterEl.hasAttribute(this.separatorAtrName)) this.counterEl.textContent = this.formatNumberWithSeparator(this.value);
            this.repeat = this.counterEl.hasAttribute(this.repeatAtrName);
        }
        initSeparator(custValue) {
            if (this.counterEl.hasAttribute(this.separatorAtrName)) {
                const matchResult = custValue.match(/[^\d]/);
                if (matchResult) {
                    this.separator = matchResult[0];
                    return this.value = custValue.split(this.separator).join("");
                } else {
                    const formatter = new Intl.NumberFormat;
                    const parts = formatter.formatToParts(1e3);
                    const localSeparator = parts.find((part => part.type === "group"));
                    this.separator = localSeparator.value;
                }
            } else this.separator = "";
            return this.value = custValue;
        }
        animateCounter() {
            let current = 0;
            let start = null;
            const step = timestamp => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / this.time, 1);
                this.counterEl.textContent = this.formatNumberWithSeparator(progress * (current + parseInt(this.value)));
                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        }
        formatNumberWithSeparator(number) {
            const integerPart = number.toFixed(0);
            return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, this.separator);
        }
        startCounter() {
            if (this.parentEl) this.setAnimationProperties();
            this.animateCounter();
        }
        setAnimationProperties() {
            this.offsetValue = this.totalLength - this.totalLength * this.value / this.maxValue;
            if (this.styleElement) {
                this.styleElement.innerText = `@keyframes ${this.animName} {\n\t\t\t\t\t100% {\n\t\t\t\t\t  stroke-dashoffset: ${this.offsetValue}; \n\t\t\t\t\t}\n\t\t\t\t  }`;
                this.circleElement.style.animation = "";
                setTimeout((() => {
                    this.circleElement.style.animation = `${this.animName} ${this.time}ms linear forwards`;
                }), 20);
                return;
            }
            this.animName = `anim-${Math.floor(Math.random() * 1e6)}`;
            const keyframesRule = `@keyframes ${this.animName} {\n\t\t\t\t100% {\n\t\t\t\t  stroke-dashoffset: ${this.offsetValue}; \n\t\t\t\t}\n\t\t\t  }`;
            this.styleElement = document.createElement("style");
            this.styleElement.append(keyframesRule);
            this.styleElement.classList.add(this.animName);
            document.head.appendChild(this.styleElement);
            this.circleElement.style.animation = `${this.animName} ${this.time}ms linear forwards`;
        }
        setStyles() {
            this.totalLength = this.circleElement.getTotalLength();
            this.svgElement.style.position = "absolute";
            this.svgElement.style.top = "0";
            this.svgElement.style.left = "0";
            this.svgElement.style.width = "100%";
            this.svgElement.style.height = "100%";
            this.svgElement.style.fill = this.fill;
            this.svgElement.style.stroke = this.stroke;
            this.svgElement.style.strokeWidth = this.strokeWidth / 16 + "rem";
            this.circleElement.style.strokeDasharray = this.totalLength;
            this.circleElement.style.strokeDashoffset = this.totalLength;
        }
        setSvgSize() {
            const attributes = [ "cx", "cy", "r" ];
            this.parentElWidth = this.parentEl.offsetWidth;
            attributes.forEach((attr => {
                if (attr === "r") this.circleElement.setAttribute(attr, (this.parentElWidth - this.strokeWidth) / 2); else this.circleElement.setAttribute(attr, this.parentElWidth / 2);
            }));
        }
        getSvgParams() {
            const svgValues = this.parentEl.getAttribute(this.parentAtrName);
            const [custFill, custStroke, custStrokeWidth, fullFilling] = svgValues.split(",").map((value => value.trim()));
            this.fill = custFill || "#000";
            this.stroke = custStroke || "#ff0000";
            this.strokeWidth = parseFloat(custStrokeWidth, 10) || 3;
            this.maxValue = fullFilling ? this.value : 100;
        }
        svgCreator() {
            this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            this.circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            this.svgElement.appendChild(this.circleElement);
            this.circleElement.setAttribute("stroke-linecap", "round");
            this.parentEl.prepend(this.svgElement);
        }
        svgInit() {
            this.parentEl.style.position = "relative";
            this.getSvgParams();
            this.svgCreator();
            const resizeObserver = new ResizeObserver((() => {
                this.setSvgSize();
                this.setStyles();
                this.setAnimationProperties();
            }));
            resizeObserver.observe(this.parentEl);
        }
        initCounter() {
            this.getCounterValues();
            this.setWidth();
            if (this.parentEl) this.svgInit();
        }
    }
    const counter = new Counter;
    counter.counterInit();
    addLoadedClass();
    menuInit();
    pageNavigation();
    function startStarAnimations() {
        const stars = document.querySelectorAll("[data-star]");
        if (stars.length === 0) return;
        stars.forEach((star => {
            const randomDelay = Math.random() * 2;
            star.style.animation = `star 3s ease ${randomDelay}s infinite`;
        }));
    }
    startStarAnimations();
})();