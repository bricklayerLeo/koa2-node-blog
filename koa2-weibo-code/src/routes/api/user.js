const router = require('koa-router')()
const { isExit, register } = require('../../controller/user')
const userValidate = require('../../validate/user')
const { genValidator } = require('../../middlewares/validate')

router.prefix('/api/user')

router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body

    ctx.body = await register({ userName, password, gender })
})

router.post('/isExit', async (ctx, next) => {
    console.log('111');
    const { userName } = ctx.request.body
    console.log(ctx.request.body, 'ctx.request.body');
    ctx.body = await isExit(userName)
})


module.exports = router


