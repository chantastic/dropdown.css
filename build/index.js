function closeDropdown(node) {
  node.setAttribute("aria-expanded", "false");
  node.querySelector("[aria-haspopup]").focus();
}

function toggleDropdown(node) {
  if (node.getAttribute("aria-expanded") === "false") {
    node.setAttribute("aria-expanded", "true");
    node.querySelector("[aria-label=close]").focus();
  } else {
    node.setAttribute("aria-expanded", "false");
  }
}

function handleDropdownEvents({ target, type, keyCode }) {
  const dropdownRootNode = this;

  if (
    keyCode === 27 &&
    type === "keyup" &&
    dropdownRootNode.classList.contains("dropdown")
  ) {
    closeDropdown(dropdownRootNode);
  }

  if (type === "click" && target.classList.contains("dropdown")) {
    closeDropdown(dropdownRootNode);
  }

  if (type === "click" && target.getAttribute("aria-haspopup") === "true") {
    toggleDropdown(dropdownRootNode);
  }

  if (type === "click" && target.getAttribute("aria-label") === "close") {
    closeDropdown(dropdownRootNode);
  }
}

module.exports = { handleDropdownEvents: handleDropdownEvents };
