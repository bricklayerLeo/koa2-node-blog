const router = require('koa-router')()


router.get('/error', async (ctx, next) => {
    await ctx.render('error')
})

router.get('*', async (ctx, next) => {
    // await ctx.render('404')
    ctx.body = {
        errno: -1,
        msg: '登陆失败'
    }
})





module.exports = router
