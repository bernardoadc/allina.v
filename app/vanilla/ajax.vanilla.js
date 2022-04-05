import json5 from '../../json5/dist/index.min.mjs'

const ajax = {
  get: (url) => fetch(url, { method: 'GET' }).then(r => r.text()),
  post: (url, data) => fetch(url, { method: 'POST', data }).then(r => r.json()),

  getJSON: (url) => fetch(url, { method: 'GET' }).then(r => r.json()),
  getJSON5: (url) => fetch(url, { method: 'GET' }).then(r => r.text()).then(r => json5.parse(r))
}

export default ajax
