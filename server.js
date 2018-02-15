const express = require('express')
const app = express()

app.use(express.static('build'))

app.get('*', function (req, res) {
  res.sendFile('/build/index.html', {root: __dirname})
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Server running')
})