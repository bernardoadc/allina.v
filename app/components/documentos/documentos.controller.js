import ajax from '../../vanilla/ajax.vanilla.js'
import { uid } from '../../uid/dist/index.mjs'
import Store from '../../vanilla/store.vanilla.js'
///
import campos from '../campos/campos.controller.js'
import fluxos from '../fluxos/fluxos.controller.js'
import diagrama from '../diagrama/diagrama.controller.js'


const store = Store()
const controller = {
  initialize,
  showList,
  x: 0
}


/* Code */

async function initialize () {
  store.documentos = await ajax.getJSON5('documentos.sample.json5')
  controller.x = 3
}

function showList () {
  const D = document.getElementById('documentos')
  D.options.length = 0
  for (const d of Object.keys(store.documentos)) {
    const o = document.createElement('option')
    o.setAttribute('value', store.documentos[d]._id)
    o.text = d

    D.appendChild(o)
  }
  diagrama.geraDiagrama()
}

const listDocumentos = {
  add: function () {
    // todo: wrong
    store.documentos[prompt('Nome do documento:')] = { _id: uid.uid() }
    showList()
  },
  edit: function () {
    // todo: wrong
    store.documentos[Object.keys(store.documentos).filter(d => store.documentos[d]._id == document.getElementById('documentos').value)[0]] = prompt('Novo nome do documento:')
    showList()
  },
  remove: function () {
    // todo: deletar relações tbm (fw e back) keep bckp?
    delete store.documentos[Object.keys(store.documentos).filter(d => store.documentos[d]._id == document.getElementById('documentos').value)[0]]
    showList()
  },
  selected: function () {
    // campos.showList() || fluxos.showSelectDocumentos()
  }
}

initialize()

export default controller
