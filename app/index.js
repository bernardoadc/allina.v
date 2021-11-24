const express = require('express')
const env = require('cqr-env')


const app = express()
const port = env(process.cwd() + '/env/port.env').port

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
