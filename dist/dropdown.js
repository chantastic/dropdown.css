(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// element-closest | CC0-1.0 | github.com/jonathantneal/closest

(function (ElementProto) {
	if (typeof ElementProto.matches !== 'function') {
		ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
			var element = this;
			var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
			var index = 0;

			while (elements[index] && elements[index] !== element) {
				++index;
			}

			return Boolean(elements[index]);
		};
	}

	if (typeof ElementProto.closest !== 'function') {
		ElementProto.closest = function closest(selector) {
			var element = this;

			while (element && element.nodeType === 1) {
				if (element.matches(selector)) {
					return element;
				}

				element = element.parentNode;
			}

			return null;
		};
	}
})(window.Element.prototype);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var closest = __webpack_require__(0);

function closeAllPopups() {
  var expandedPopups = document.querySelectorAll("[aria-expanded=true]");
  return expandedPopups.forEach(function (e) {
    return e.setAttribute("aria-expanded", "false");
  });
}

function focusCloseLabel(el) {
  return el.querySelector("[aria-label='close']").focus();
}

function closePopup(el) {
  el.setAttribute("aria-expanded", "false");
  el.querySelector("[aria-haspopup]").focus();
  return;
}

function togglePopup(el) {
  if (el.getAttribute("aria-expanded") === "false") {
    el.setAttribute("aria-expanded", "true");
    el.querySelector("[aria-label=close]").focus();
    return;
  }

  return el.setAttribute("aria-expanded", "false");
}

function handleHasPopupEvent(_ref) {
  var target = _ref.target,
      type = _ref.type,
      keyCode = _ref.keyCode;

  var popupRoot = target.closest("[aria-expanded]");

  if (type === "click") {
    closeAllPopups();
    return togglePopup(popupRoot);
  }
}

function handleLabelEvent(_ref2) {
  var target = _ref2.target,
      type = _ref2.type,
      keyCode = _ref2.keyCode;

  var popupRoot = target.closest("[aria-expanded]");

  if (keyCode === 27 && type === "keyup" && target.getAttribute("aria-label") === "close") {
    return closePopup(popupRoot);
  }

  if (keyCode === 32 && type === "keyup" && target.getAttribute("aria-label") === "close") {
    return closePopup(popupRoot);
  }

  if (type === "click" && target.getAttribute("aria-label") === "close") {
    return closePopup(popupRoot);
  }
}

function handleExpandedEvent(_ref3) {
  var target = _ref3.target,
      type = _ref3.type;

  var popupRoot = target.closest("[aria-expanded]");

  if (type === "click" && target.getAttribute("aria-expanded") === "true") {
    return closePopup(popupRoot);
  }
}

function handleInsideExpandedEvent(_ref4) {
  var target = _ref4.target,
      type = _ref4.type,
      keyCode = _ref4.keyCode;

  var popupRoot = target.closest("[aria-expanded]");

  if (keyCode === 27 && type === "keyup" && popupRoot) {
    return focusCloseLabel(popupRoot);
  }
}

function handleAriaPopup(e) {
  if (!e.target) return;

  var popupRoot = e.target.closest("[aria-expanded]");

  if (e.target.getAttribute("aria-haspopup")) {
    return handleHasPopupEvent(e);
  }

  if (e.target.getAttribute("aria-label")) {
    return handleLabelEvent(e);
  }

  if (e.target.getAttribute("aria-expanded")) {
    return handleExpandedEvent(e);
  }

  if (popupRoot) {
    return handleInsideExpandedEvent(e);
  }

  if (!popupRoot) {
    return closeAllPopups();
  }
}

module.exports = { handleAriaPopup: handleAriaPopup };

/***/ })
/******/ ]);
});