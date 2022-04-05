import Components from './vanilla/components.vanilla.js'
import Store from './vanilla/store.vanilla.js'
import If from './vanilla/if.vanilla.js'
import Interpolate from './vanilla/interpolate.vanilla.js'

import documentos from './components/documentos/documentos.controller.js'
import campos from './components/campos/campos.controller.js'
import fluxos from './components/fluxos/fluxos.controller.js'
import diagrama from './components/diagrama/diagrama.controller.js'

const store = Store()

async function setup () {
  await Components.load({ app: true })
  await If.evaluate()
  Interpolate()
}

async function initialize () {
  await setup()

  documentos.showList()
  fluxos.showSelectDocumentos()
  diagrama.geraDiagrama()
}

initialize()
