const forEach  = require("lodash.forEach")

const { closest } = require("./element.js")

function contract (popup) {
  popup.setAttribute("aria-expanded", "false")
}

function contractAll () {
  const popups = document.querySelectorAll("[aria-expanded]")

  forEach(popups, p => contract(p))
}

function expand (popup) {
  popup.setAttribute("aria-expanded", "true")
}

function focusDisclosureButton (popup) {
  const button = popup.querySelector("[aria-haspopup]")

  if(button) popup.querySelector("[aria-haspopup]").focus()
}

function focusCloseLabel (popup) {
  const closeLabel = popup.querySelector("[aria-label=close]")

  if(closeLabel) closeLabel.focus()
}

function toggle (popup) {
  switch (popup.getAttribute("aria-expanded")) {
    case null:
      break
    case "false":
      contractAll()
      expand(popup)
      focusCloseLabel(popup)
      break
    case "true":
      contract(popup)
      focusDisclosureButton(popup)
      break
    default:
      break
  }
}

module.exports = {
  contract,
  contractAll,
  expand,
  focusDisclosureButton,
  focusCloseLabel,
  toggle,
}
