//javascript
'use strict'

const render = require('./lib/render')
const logger = require('koa-logger')
const route = require('koa-route')
const koa = require('koa')

let app = koa()

// "database"
let posts = []

//logger middleware
app.use(logger())

//route middleware
app.use(route.get('/', function* () {
    this.body = yield.render('home', { title: 'HomePage', posts })
}))
