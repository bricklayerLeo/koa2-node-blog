const router = require('koa-router')()
const { isExit } = require('../../controller/user')

router.prefix('/api/user')
router.post('/login', async (ctx, next) => {
})

router.post('/isExit', async (ctx, next) => {
    console.log('111');
    const { userName } = ctx.request.body
    console.log(ctx.request.body, 'ctx.request.body');
    ctx.body = await isExit(userName)
})


module.exports = router


