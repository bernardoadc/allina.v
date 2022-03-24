const ajax = {
  get: (url) => fetch(url, { method: 'GET' }).then(r => r.text().catch(e => e)),
  post: (url, data) => fetch(url, { method: 'POST', data }).then(r => r.json().catch(e => e))
}

// todo: catch falhando
