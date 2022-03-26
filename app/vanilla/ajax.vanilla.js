const Ajax = {
  get: (url) => fetch(url, { method: 'GET' }).then(r => r.text()),
  post: (url, data) => fetch(url, { method: 'POST', data }).then(r => r.json()),

  getJSON: (url) => fetch(url, { method: 'GET' }).then(r => r.json())
}

export default Ajax
