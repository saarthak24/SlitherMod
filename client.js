// ==UserScript==
// @name         SlitherMod
// @namespace    https://github.com/saarthak24/SlitherMod
// @version      1.0
// @description  Mod for Slither.io browser game
// @author       Saarthak Sethi
// @match        http://slither.io/
// @grant        none
// ==/UserScript==

var canvas = window.canvas = (function (window) {
    return {
        setZoom: function (e) {
            if (window.gsc) {
                window.gsc *= Math.pow(0.9, e.wheelDelta / -120 || e.detail / 2 || 0);
                window.desired_gsc = window.gsc;
            }
        }
    };
})(window);

var userInterface = window.userInterface = (function (window, document) {
    var original_oef = window.oef;
    var original_redraw = window.redraw;

    window.oef = function () { };
    window.redraw = function () { };

    return {
        overlays: {},
        gfxEnabled: true,

        oefTimer: function () {
            var start = Date.now();
            original_oef();
            original_redraw();
            window.raf(userInterface.oefTimer);
        }
    };
})(window, document);

// Main
(function (window, document) {
    document.body.addEventListener('mousewheel', canvas.setZoom);
    document.body.addEventListener('DOMMouseScroll', canvas.setZoom);
    userInterface.oefTimer();
})(window, document);
