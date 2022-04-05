const ini = '{{'
const end = '}}'

async function evaluate (context = document) {
  const els = document.querySelectorAll('*')
  for (const el of els) {
    el.childNodes.forEach(function (child) {
      if (child.nodeType == 3) {
        if (child.textContent.includes(ini) && child.textContent.includes(end)) { // textNode
          child.exprs = child.textContent.match(new RegExp(`${ini}.+?${end}`, 'g'))
          child.exprs.forEach(function (expression) {
            const expr = expression.replace(ini, '').replace(end, '').trim()
            child.textContent = child.textContent.replace(expression, eval(expr)) // eslint-disable-line no-eval
          })
        }
      }
    })
  }
}

export default evaluate

