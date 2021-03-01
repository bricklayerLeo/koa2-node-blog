const Koa = require('koa')
const path = require('path')
const app = new Koa()
// const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const jwtKoa = require('koa-jwt')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db.js')
const { SESSION_KEY, JWT_TOKEN } = require('./conf/secret')

const errorViewRouter = require('./routes/view/error')
const index = require('./routes/index')  //引入路由 
const users = require('./routes/api/user')
const setting = require('./routes/api/setting')
const utilsAPi = require('./routes/api/utils')
console.log('------------------', utilsAPi);
// error handler
onerror(app)   //页面打印error

// middlewares
app.use(bodyparser({  //解析post数据
  enableTypes: ['json', 'form', 'text']
}))

app.use(json())
app.use(logger())  //日志


app.use(require('koa-static')(__dirname + '/public'))
// app.use(require('koa-static')(__dirname + '../uploadFiles'))
app.use(require('koa-static')(path.join(__dirname), '..', '..', 'uploadFiles'))

// app.use(views(__dirname + '/views', {
//   extension: 'ejs'
// }))

app.keys = [SESSION_KEY]
app.use(session({
  key: 'weibo.sid', //cookie的name  默认是`koa.sid`
  prefix: 'weibo:sess:', //redis key 的前缀 默认是 ` koa:sess:`
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 //cookie过期时间
  },
  // ttl: 24 * 60 * 60 * 1000, //redis过期时间
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// token 验证
app.use(jwtKoa({
  secret: JWT_TOKEN
}).unless(
  { path: [/\/isExit/, /\/login/, /\/register/] } //某些路由不需要 权限
))


// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(utilsAPi.routes(), utilsAPi.allowedMethods())
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(setting.routes(), setting.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {   //控制台打印error
  console.error('server error', err, ctx)
});

module.exports = app
