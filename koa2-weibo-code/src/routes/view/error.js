const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
})

router.get('/error', async (ctx, next) => {
    await ctx.render('error')
})

router.get('*', async (ctx, next) => {
    await ctx.render('404')
})





module.exports = router
