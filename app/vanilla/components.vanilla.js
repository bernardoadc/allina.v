import ajax from './ajax.vanilla.js'


const ATTRIBUTES = ['name', 'src', 'loaded']
const FORBIDDEN_EVENTS = ['onpointermove', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmouseout', 'onmouseover']
const OPTIONS = {
  app: false,
  window: false,
  attachToDOM: true,
  attachToDescendants: true,
  bindCaptureEvents: false
}
const components = []

async function hydrate (context = document) {
  const els = context.getElementsByTagName('component')
  for (const el of els) {
    const attrs = ATTRIBUTES.reduce((o, k) => (o[k] = el.getAttribute(k), o), {}) // eslint-disable-line no-sequences
    if (attrs.loaded) continue

    try {
      const r = await ajax.get(attrs.src)
      el.innerHTML = r
      el.setAttribute('loaded', 'true')
      console.info(`Component ${attrs.name} loaded`)
      components.push({
        name: attrs.name,
        el: el,
        src: attrs.src
      })

      hydrate(el)
    } catch (e) {
      el.innerHTML = e.message
    }
  }
}

function bindCaptureEvents (el, data) {
  for (const prop in el) {
    if (prop.substr(0, 2) == 'on' && !FORBIDDEN_EVENTS.includes(prop)) el.addEventListener(prop.substr(2), function (evt) {
      evt.data = data
      // for (const d in data) {
      //   evt[d] = data[d]
      // }
    }, {passive: true})
  }
}

async function attachToDescendants (data, el) {
  el.childNodes.forEach(function (child) {
    if (child.nodeType !== 3) { // textNode
      child.data = Object.assign(Object.create(data), {})
      attachToDescendants(data, child)
    }
  })
}

async function publicize (opt) {
  for (const component of components) {
    const data = (await import('.' + component.src.replace('component.html', 'controller.js'))).default // TO-DO make imports relative and correct; contemplate when is not default

    if (opt.app) window.app[component.name] = data
    if (opt.window) window[component.name] = data

    if (opt.attachToDOM) component.el.data = { ...component.el.data, ...data }
    if (opt.attachToDescendants) attachToDescendants(data, component.el)
    if (opt.bindCaptureEvents) bindCaptureEvents(component.el, data)
  }
}

async function load ({ ...options }) {
  const opt = { ...OPTIONS, ...options }
  if (opt.app) window.app = {}

  await hydrate()
  await publicize(opt)
}

export default {
  load
}
