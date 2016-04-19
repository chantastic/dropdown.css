function closeDropdown (node) {
  node.setAttribute("aria-expanded", "false")
  node.querySelector("[aria-haspopup]").focus()
}

function toggleDropdown (node) {
  if(node.getAttribute("aria-expanded") === "false") {
    node.setAttribute("aria-expanded", "true")
    node.querySelector("[aria-label=close]").focus()
  } else {
    node.setAttribute("aria-expanded", "false")
  }
}

function handleDropdownEvents ({ target, type, keyCode }) {
  const dropdownRootNode = this // jquery element

  // if(e.type !== 'click') { return }

  if(
    keyCode === 27 &&
    type === "keyup" &&
    dropdownRootNode.classList.contains("dropdown")
  ) {
    console.log("inside esc")
    closeDropdown(dropdownRootNode)
  }

  if(type === "click" && target.classList.contains("dropdown")) {
    console.log("outside click")
    closeDropdown(dropdownRootNode)
  }

  if(type === "click" && target.getAttribute("aria-haspopup") === "true") {
    console.log("normal toggle")
    toggleDropdown(dropdownRootNode)
  }

  if(type === "click" && target.getAttribute("aria-label") === "close") {
    console.log("close clicked")
    closeDropdown(dropdownRootNode)
  }
}

module.exports = { handleDropdownEvents: handleDropdownEvents }
