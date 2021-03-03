const router = require('koa-router')()
const { isExit, register, changePassword, login, changeuserInfo } = require('../../controller/user')
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
    // console.log(ctx.request.body, 'ctx.request.body');
    ctx.body = await isExit(userName)
})

router.post('/login', genValidator(userValidate), async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login({ ctx, userName, password })
})

router.post('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    // ctx.body = '123'
    ctx.body = await changeuserInfo(ctx, { nickName, city, picture })
})

router.post('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { password, newPassword } = ctx.request.body
    ctx.body = await changePassword(ctx, { password, newPassword })
})

router.post('/logout', loginCheck, async (ctx, next) => {
    const { password, newPassword } = ctx.request.body
    ctx.body = await changePassword(ctx, { password, newPassword })
})
module.exports = router


