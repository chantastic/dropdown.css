function matches (element, selector) {
  const elements = document.querySelectorAll(selector);

  let index = 0

  while (
    elements[index] &&
    elements[index] !== element
  ) ++index

  return Boolean(elements[index]);
}

function closest (element, selector) {
  while (
    element &&
    element.nodeType === 1
  ) {
    if (matches(element, selector)) return element;

    element = element.parentNode;
  }

  return null;
}

module.exports = {
  matches,
  closest,
}
