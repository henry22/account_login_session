const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const expressHandlebars = require('express-handlebars')

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use((req, res, next) => {
  if (!req.session.views) {
    req.session.views = {}
  }

  // count the views
  req.session.views['/'] = (req.session.views['/'] || 0) + 1

  next()
})

app.get('/', (req, res) => {
  const views = req.session.views['/']
  res.render('index', { views: views })
})

app.listen(port, () => console.log(`The server is listening on http:localhost:${port}`))