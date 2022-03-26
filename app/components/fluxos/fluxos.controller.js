import ajax from '../../vanilla/ajax.vanilla.js'
import Store from '../../vanilla/store.vanilla.js'
///
import diagrama from '../diagrama/diagrama.controller.js'


const store = Store()
const controller = {
  initialize,
  showSelectDocumentos,
  showSelectFields,
  showFluxos
}


/* Code */

function initialize () {
  ajax.getJSON5('fluxo.sample.json5').then(r => store.fluxo = r)
}

function showSelectDocumentos () {
  const T = document.getElementById('documentos')
  if (!T.selectedOptions.length) return
  t = T.selectedOptions[0].text

  const D = document.getElementById('fdocumentos')
  D.options.length = 0
  for (const d of Object.keys(documentos)) {
    if (d == t) continue

    const o = document.createElement('option')
    o.setAttribute('value', documentos[d]._id)
    o.text = d

    D.appendChild(o)
  }
  D.value = null
}

function showSelectFields () {
  const D = document.getElementById('fdocumentos')
  const d = D.selectedOptions[0].text
  const F = document.getElementById('fcampos')
  F.options.length = 0
  for (const f of Object.keys(store.documentos[d])) {
    if (f == '_id') continue

    const o = document.createElement('option')
    o.setAttribute('value', f)
    o.text = store.documentos[d][f]

    F.appendChild(o)
  }
  F.value = null
}

function showFluxos () {
  // todo
  debugger
  // <div class="fluxo">
  //   <span class="fluxoDesc">Doc / campo</span>
  //   <button class="btnRemove" onclick="fluxos.remove(id)">-</button>
  // </div>
  diagrama.geraDiagrama()
}

const fluxos = {
  add: function () {
    // todo
    // get id 1
    // get id 2
    // fluxo.pricipal[id1] = id2
    showFluxos()
  },
  remove: function (id) {
    // todo
    // acha id no valor = filter
    showFluxos()
  },
  valida: function () {
    // todo
    // varre cada fluxo e ve se existem ainda os campos de ambos lados
  }
}

initialize()

export default controller
