const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const checkAccount = require('./check_account')

let isLogin = false

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 1000
  }
}))

app.get('/', (req, res) => {
  if (req.session.email && req.session.password) {
    name = req.session.firstName
    isLogin = true;

    res.render('welcome', { name: name, logstatus: isLogin })
  } else {
    res.render('index')
  }
})

app.get('/welcome', (req, res) => {
  if(req.session.email && req.session.password){
    name = req.session.firstName
    isLogin = true;

    res.render('welcome', { name: name, logstatus: isLogin })
  } else {
    res.redirect('/')
  }
})

// logout
app.get('/logout', (req, res) => {
  req.session.destroy()
  isLogin = false
  res.redirect('/')
})

app.post('/', (req, res) => {
  const account = req.body
  const isValidated = checkAccount(account).length ? true : false
  const matchAccount = checkAccount(account)[0]

  if (isValidated) {
    req.session.email = matchAccount.email
    req.session.password = matchAccount.password
    req.session.firstName = matchAccount.firstName
    res.redirect('/welcome')
  } else {
    res.render('index', { isValidated: !isValidated })
  }

})

app.listen(port, () => console.log(`The server is listening on http:localhost:${port}`))