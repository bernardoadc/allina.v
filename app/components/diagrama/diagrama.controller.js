import Store from '../../vanilla/store.vanilla.js'
import mermaid from '../../mermaid/dist/mermaid.esm.min.mjs'


const store = Store()
const controller = {
  initialize,
  geraDiagrama
}


/* Code */

async function initialize () {
  mermaid.initialize({startOnLoad: true})
}

function geraDiagrama () {
  const defs = Object.keys(store.documentos).reduce(function (r, k, i, a) {
    if (k.substr(0, 1) === '_') return r
    r ||= '' // eslint-ignore

    r += `  state ${k} {\n`
    r += Object.keys(store.documentos[k]).reduce(function (s, l, j, b) {
      if (l.substr(0, 1) === '_') return s
      s ||= ''
      s += `    ${l}: ${store.documentos[k][l]}\n`
      return s
    }, '')
    r.substr(-2)
    r += '  }\n\n'

    return r
  }, '')

  const dePara = Object.keys(store.fluxo.principal).reduce(function (r, k, i, a) {
    r ||= ''

    r += `  ${k} --> ${store.fluxo.principal[k]}\n`

    return r
  }, '')

  let diagram = 'stateDiagram-v2\n'
  diagram += 'direction LR\n\n'
  diagram += defs
  diagram += dePara
  diagram += ''

  // document.getElementById('diagram').innerHTML = diagram
  mermaid.mermaidAPI.render('fluxo', diagram, function insertSvg (svgCode, bindFunctions) {
    document.getElementById('diagram').innerHTML = svgCode
  })
  // mermaid.init(undefined, document.getElementById('diagram'))
}

initialize()

export default controller
