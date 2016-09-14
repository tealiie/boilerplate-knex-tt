var bodyParser = require('body-parser')
var express = require('express')
var hbs = require('express-handlebars')
var path = require('path')
var index = require('./routes/index')

var PORT = 3000

var app = express()
app.engine('hbs', hbs())
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', index.get)
app.get('/profile/:id', index.profile)
app.post('/new-user', index.createUser)

app.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
