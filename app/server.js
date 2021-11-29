const express = require('express')
const env = require('cqr-env')


const app = express()
const port = env(process.cwd() + '/env/port.env').port

app.use(express.static('node_modules'))
app.use(express.static('app'))
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '\\app\\index.html')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
