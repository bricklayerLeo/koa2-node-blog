const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  console.log(ctx.session);
  let session = ctx.session
  if (session.viewNum == null) {
    session.viewNum = 0
  } else {
    session.viewNum++
  }
  ctx.body = {
    title: 'koa2 json',
    num: session.viewNum
  }
})

module.exports = router
