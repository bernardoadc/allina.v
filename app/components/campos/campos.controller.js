import ajax from '../../vanilla/ajax.vanilla.js'
import Store from '../../vanilla/store.vanilla.js'
///
import diagrama from '../diagrama/diagrama.controller.js'


const store = Store()
const controller = {
  // initialize
  showList
}


/* Code */

function showList () {
  const D = document.getElementById('documentos')
  const d = D.selectedOptions[0].text
  const F = document.getElementById('campos')
  F.options.length = 0
  for (const f of Object.keys(store.documentos[d])) {
    if (f == '_id') continue

    const o = document.createElement('option')
    o.setAttribute('value', f)
    o.text = store.documentos[d][f]

    F.appendChild(o)
  }
  diagrama.geraDiagrama()
}

const listCampos = {
  add: function () {
    // todo: wrong
    store.documentos[uid.uid()] = prompt('Nome do campo:')
    showList()
  },
  edit: function () {
    store.documentos[Object.keys(store.documentos).filter(d => store.documentos[d]._id == document.getElementById('documentos').value)[0]][document.getElementById('campos').value] = prompt('Novo nome do campo:')
    showList()
  },
  remove: function () {
    delete store.documentos[Object.keys(store.documentos).filter(d => store.documentos[d]._id == document.getElementById('documentos').value)[0]][document.getElementById('campos').value]
    // todo: deletar relações tbm (fw e back) keep bckp?
    showList()
  }
}

export default controller
