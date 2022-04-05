function getAttributes (o) {
  const ignore = ['tag', 'innerText', 'children']
  return Object.keys(o).reduce(function (r, k) {
    if (ignore.includes(k)) return r
    r += o[k] ? ` ${k}="${o[k] instanceof Array ? o[k].join(' ') : o[k]}"` : ` ${k}`
    return r
  }, '')
}

function getChildren (o) {
  return o.children.reduce(function (r, c) {
    r += toHtml(c)
    return r
  }, '')
}

const toHtml = (o) => `<${o.tag}${getAttributes(o)}>${o.innerText || getChildren(o)}</${o.tag}>`

export default toHtml
