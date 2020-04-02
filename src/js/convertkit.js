/* eslint-env browser */

/**
 * Removes all Convertkit styles so we can style them using our CSS
 * @param {HTMLElement} targetNode
 */
function removeConvertkitInlineStyles (targetNode) {
  if (!targetNode) return
  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      const { target } = mutation

      // Removes Convertkit's style elements so their classes does nothing
      const styleElement = target.querySelector('style')
      if (styleElement) styleElement.remove()

      // Removes Inline styles injected by Convertkit's form builder
      recursiveRemoveInlineStyle(target)

      // Create Labels... IF not there already
      const fields = target.querySelectorAll('.formkit-field')
      fields.forEach(field => {
        const input = field.querySelector('input')
        const label = document.createElement('label')
        label.for = input.name
        label.textContent = input.placeholder
        input.placeholder = ''
        input.id = input.name
        input.insertAdjacentElement('beforebegin', label)
      })
    }
  })

  observer.observe(targetNode, { childList: true })
}

function recursiveRemoveInlineStyle (element) {
  element.removeAttribute('style')
  if (element.children) {
    ;[...element.children].forEach(recursiveRemoveInlineStyle)
  }
}

const targetNode = document.querySelector('.convertkit')
removeConvertkitInlineStyles(targetNode)
