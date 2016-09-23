const includes = require("lodash.includes")

const { closest } = require("./element.js")

const {
  contract,
  contractAll,
  focusDisclosureButton,
  focusCloseLabel,
  toggle,
} = require("./popup.js")

function isNodeCloseButton (node) {
  return (
    node.getAttribute("aria-label") &&
    node.getAttribute("aria-label") === "close"
  )
}

function handleClickEvent (event) {
  const { target } = event
  const popup = closest(target, "[aria-expanded]")

  if(
    !popup &&
    document.querySelector("[aria-expanded=true]")
  ) {
    event.preventDefault()
    return contractAll()
  }

  if(!popup) return

  if(isNodeCloseButton(target)) {
    contract(popup)
    focusDisclosureButton(popup)
    return
  }

  if(target.getAttribute("aria-haspopup")) return toggle(popup)
}

function handleKeyupEvent ({ target }) {
  const popup = closest(target, "[aria-expanded]")

  // return early if no expanded popups
  if(!document.querySelector("[aria-expanded=true]")) return

  // contract all popups if esc not in popup but expanded popups exist
  if(!popup) return contractAll()

  // esc from disclosure button
  if(target.getAttribute("aria-haspopup")) return contract(popup)

  // esc from `close` button
  if(isNodeCloseButton(target)) {
    contract(popup)
    focusDisclosureButton(popup)
    return
  }

  // esc from within popup
  return focusCloseLabel(popup)
}

function handlePopupEvent (event) {
  const {
    target,
    type,
    keyCode,
  } = event

  // guards

  if(!includes(["click", "keyup"], type)) return

  if(type === "keyup" && keyCode !== 27) return

  if(type === "keyup") return handleKeyupEvent(event)

  if(type === "click") return handleClickEvent(event)
}

module.exports = { handlePopupEvent }
