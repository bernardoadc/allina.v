// todo: quebra em arqs separados. Tá uma zona

const documentos = {
  cadastro: {
    _id: 'asd',
    1: 'codCliente',
    2: 'nome',
    3: 'dataNascimento',
    4: 'email',
    5: 'telefone',
    6: 'endereço',
    7: 'CEP',
    8: 'cidade',
    9: 'estado',
    a: 'rendaFamiliar'
  },
  orçamento: {
    _id: 'asd2',
    b: 'codCliente',
    c: 'nome',
    d: 'produto',
    e: 'valor'
  }
}

const fluxo = {
  principal: {
    1: 'b',
    2: 'c'
  }
}

function geraDiagrama () {
  const defs = Object.keys(documentos).reduce(function (r, k, i, a) {
    if (k.substr(0, 1) === '_') return r
    r ||= '' // eslint-ignore

    r += `  state ${k} {\n`
    r += Object.keys(documentos[k]).reduce(function (s, l, j, b) {
      if (l.substr(0, 1) === '_') return s
      s ||= ''
      s += `    ${l}: ${documentos[k][l]}\n`
      return s
    }, '')
    r.substr(-2)
    r += '  }\n\n'

    return r
  }, '')

  const dePara = Object.keys(fluxo.principal).reduce(function (r, k, i, a) {
    r ||= ''

    r += `  ${k} --> ${fluxo.principal[k]}\n`

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

function showListDocumentos () {
  D = document.getElementById('documentos')
  D.options.length = 0
  for (d of Object.keys(documentos)) {
    const o = document.createElement('option')
    o.setAttribute('value', documentos[d]._id)
    o.text = d

    D.appendChild(o)
  }
}
function showListFields () {
  D = document.getElementById('documentos')
  d = D.selectedOptions[0].text
  F = document.getElementById('campos')
  F.options.length = 0
  for (f of Object.keys(documentos[d])) {
    if (f == '_id') continue

    const o = document.createElement('option')
    o.setAttribute('value', f)
    o.text = documentos[d][f]

    F.appendChild(o)
  }
}
function showSelectDocumentos () {
  T = document.getElementById('documentos')
  if (!T.selectedOptions.length) return
  t = T.selectedOptions[0].text

  D = document.getElementById('fdocumentos')
  D.options.length = 0
  for (d of Object.keys(documentos)) {
    if (d == t) continue

    const o = document.createElement('option')
    o.setAttribute('value', documentos[d]._id)
    o.text = d

    D.appendChild(o)
  }
  D.value = null
}
function showSelectFields () {
  D = document.getElementById('fdocumentos')
  d = D.selectedOptions[0].text
  F = document.getElementById('fcampos')
  F.options.length = 0
  for (f of Object.keys(documentos[d])) {
    if (f == '_id') continue

    const o = document.createElement('option')
    o.setAttribute('value', f)
    o.text = documentos[d][f]

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
}


const lists = {}
lists.documentos = {}
lists.documentos.add = function () {
  // todo: wrong
  documentos[prompt('Nome do documento:')] = { _id: uid.uid() }
  showListDocumentos()
  geraDiagrama()
}
lists.documentos.edit = function () {
  // todo: wrong
  documentos[Object.keys(documentos).filter(d => documentos[d]._id == document.getElementById('documentos').value)[0]] = prompt('Novo nome do documento:')
  showListDocumentos()
  geraDiagrama()
}
lists.documentos.remove = function () {
  // todo: deletar relações tbm (fw e back) keep bckp?
  delete documentos[Object.keys(documentos).filter(d => documentos[d]._id == document.getElementById('documentos').value)[0]]
  showListDocumentos()
  geraDiagrama()
}
lists.campos = {}
lists.campos.add = function () {
  // todo: wrong
  documentos[uid.uid()] = prompt('Nome do campo:')
  showListFields()
  geraDiagrama()
}
lists.campos.edit = function () {
  documentos[Object.keys(documentos).filter(d => documentos[d]._id == document.getElementById('documentos').value)[0]][document.getElementById('campos').value] = prompt('Novo nome do campo:')
  showListFields()
  geraDiagrama()
}
lists.campos.remove = function () {
  delete documentos[Object.keys(documentos).filter(d => documentos[d]._id == document.getElementById('documentos').value)[0]][document.getElementById('campos').value]
  // todo: deletar relações tbm (fw e back) keep bckp?
  showListFields()
  geraDiagrama()
}

const fluxos = {}
fluxos.add = function () {
  // todo
  // get id 1
  // get id 2
  // fluxo.pricipal[id1] = id2
  showFluxos()
  geraDiagrama()
}
fluxos.remove = function (id) {
  // todo
  // acha id no valor = filter
  showFluxos()
  geraDiagrama()
}
fluxos.valida = function () {
  // todo
  // varre cada fluxo e ve se existem ainda os campos de ambos lados
}

function initialize () {
  mermaid.initialize({startOnLoad: true})
  showListDocumentos()
  showSelectDocumentos()
  geraDiagrama()
}
initialize()
