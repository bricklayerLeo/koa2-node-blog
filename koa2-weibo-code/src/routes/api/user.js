const router = require('koa-router')()
const { isExit, register, login } = require('../../controller/user')
const userValidate = require('../../validate/user')
const { genValidator } = require('../../middlewares/validate')
const loginCheck = require('../../middlewares/loginCheck')
router.prefix('/api/user')

router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body

    ctx.body = await register({ userName, password, gender })
})

router.post('/isExit', async (ctx, next) => {
    const { userName } = ctx.request.body
    console.log(ctx.request.body, 'ctx.request.body');
    ctx.body = await isExit(userName)
})

router.post('/login', genValidator(userValidate), async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login({ ctx, userName, password })
})

router.post('/jsona', loginCheck, async (ctx, next) => {
    ctx.body = '123'
})

module.exports = router


