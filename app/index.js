import Components from './vanilla/components.vanilla.js'
import Store from './vanilla/store.vanilla.js'

import documentos from './components/documentos/documentos.controller.js'
import campos from './components/campos/campos.controller.js'
import fluxos from './components/fluxos/fluxos.controller.js'
import diagrama from './components/diagrama/diagrama.controller.js'

const store = Store()

async function setup () {
  // mermaid.initialize({startOnLoad: true})
  Components.hydrate()
}

async function initialize () {
  await setup()

  documentos.showList()
  fluxos.showSelectDocumentos()
  diagrama.geraDiagrama()
}

initialize()
