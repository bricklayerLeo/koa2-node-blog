const router = require('koa-router')()
const { isExit, register, login, setting } = require('../../controller/user')
const userValidate = require('../../validate/user')
const { genValidator } = require('../../middlewares/validate')
const loginCheck = require('../../middlewares/loginCheck')
router.prefix('/api/setting')


/**
 * @description 用户设置的接口
 * 
 */
router.get('/userinfo', loginCheck, async (ctx, next) => {
    ctx.body = await setting(ctx)
})



module.exports = router


