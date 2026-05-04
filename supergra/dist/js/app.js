(() => {
    "use strict";
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
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
})();