// function $$(selector, context) {
//   context = context || document;
//   var elements = context.querySelectorAll(selector);
//   return Array.prototype.slice.call(elements);
// }

// let html = $$('html')[0].innerHTML
// let result

//   while (result = /{{#if.+}}[^]+?{{\/if}}/g.exec(html)) {
//   const block = result[0]
//   const expr = /{{#if \((.+)\)}}/y.exec(block)[1]
//   const content = /{{#if.+}}([^]+){{\/if}}/y.exec(block)[1]

//   if (!eval(expr)) // eslint-disable-line no-eval
//     $$('html')[0].innerHTML = html.replace(block, '')
//   else
//     $$('html')[0].innerHTML = html.replace(block, content)

//   html = $$('html')[0].innerHTML
// }

const ATTRIBUTES = ['condition']

async function evaluate (context = document) {
  const els = context.getElementsByTagName('if')
  for (const el of els) {
    const attrs = ATTRIBUTES.reduce((o, k) => (o[k] = el.getAttribute(k), o), {}) // eslint-disable-line no-sequences

    if (eval(attrs.condition) && el.if) { // eslint-disable-line no-eval
      el.innerHTML = el.if
      el.if = undefined
    } else {
      el.if = el.innerHTML
      el.innerHTML = ''
    }
  }
}

export default {
  evaluate
}
