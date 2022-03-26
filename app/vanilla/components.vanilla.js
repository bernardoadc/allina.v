import Ajax from './ajax.vanilla.js'

const attributes = ['name', 'src', 'loaded']

// export const load =
function load (context = document) {
  const els = context.getElementsByTagName('component')
  for (const el of els) {
    const attrs = attributes.reduce((o, k) => (o[k] = el.getAttribute(k), o), {}) // eslint-disable-line no-sequences
    if (attrs.loaded) continue

    Ajax.get(attrs.src).then(function (r) {
      el.innerHTML = r
      el.setAttribute('loaded', 'true')
      console.info(`Component ${attrs.name} loaded`)
      load(el)
    }).catch(e => el.innerHTML = e.message)
  }
}

export default {
  hydrate: load
}
