//node
'use strict'

const fs = require('fs')
const koa = require('koa')
const parse = require('co-body')
const views = require('co-views')
const route = require('koa-route')
const logger = require('koa-logger')


// const DUMB = "AlloyEditor.editable('content'), AlloyEditor.editable('textText')"
let app = module.exports = koa()

let render = views(`${__dirname}/views`, {ext: 'ejs' });

let data = JSON.parse(fs.readFileSync('data.json'))

app.use(logger())

// app.use(homePage)

app.use(ignoreAssets(route.get('/', homePage)))
// app.use(route.get('/custom.js', function * () { this.body = DUMB }))
app.use(route.post('/post', function * () {
    let body = yield parse(this)

    console.log('BODY', body)

    fs.writeFileSync('data.json', JSON.stringify(body))
    this.redirect('/')
}))

app.listen(3000);
console.log('listening on port 3000');

function *homePage () {
    this.body = yield render('index', { data: JSON.parse(fs.readFileSync('data.json')) })
}

function ignoreAssets(mw) {
  return function *(next){
    if (/(\.js|\.css|\.ico)$/.test(this.path)) {
      this.body = fs.readFileSync(`${__dirname}/views/${this.path}`)
    } else {
      // must .call() to explicitly set the receiver
      // so that "this" remains the koa Context
      yield mw.call(this, next);
    }
  }
}
