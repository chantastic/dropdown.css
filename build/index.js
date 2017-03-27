const closest = require("element-closest");

function closeAllPopups() {
  const expandedPopups = document.querySelectorAll("[aria-expanded=true]");
  return expandedPopups.forEach(e => e.setAttribute("aria-expanded", "false"));
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

function handleHasPopupEvent({ target, type, keyCode }) {
  const popupRoot = target.closest("[aria-expanded]");

  if (type === "click") {
    closeAllPopups();
    return togglePopup(popupRoot);
  }
}

function handleLabelEvent({ target, type, keyCode }) {
  const popupRoot = target.closest("[aria-expanded]");

  if (
    keyCode === 27 &&
    type === "keyup" &&
    target.getAttribute("aria-label") === "close"
  ) {
    return closePopup(popupRoot);
  }

  if (
    keyCode === 32 &&
    type === "keyup" &&
    target.getAttribute("aria-label") === "close"
  ) {
    return closePopup(popupRoot);
  }

  if (type === "click" && target.getAttribute("aria-label") === "close") {
    return closePopup(popupRoot);
  }
}

function handleExpandedEvent({ target, type }) {
  const popupRoot = target.closest("[aria-expanded]");

  if (type === "click" && target.getAttribute("aria-expanded") === "true") {
    return closePopup(popupRoot);
  }
}

function handleInsideExpandedEvent({ target, type, keyCode }) {
  const popupRoot = target.closest("[aria-expanded]");

  if (keyCode === 27 && type === "keyup" && popupRoot) {
    return focusCloseLabel(popupRoot);
  }
}

function handleAriaPopup(e) {
  if (!e.target) return;

  const popupRoot = e.target.closest("[aria-expanded]");

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

module.exports = { handleAriaPopup };
