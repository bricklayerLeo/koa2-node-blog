const router = require('koa-router')()
const loginCheck = require('../../middlewares/loginCheck')
const blogValidate = require('../../validate/blog')
const { genValidator } = require('../../middlewares/validate')
const { createBloCon } = require('../../controller/blog')

router.prefix('/api/blog')

router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
    const { image, content } = ctx.request.body
    ctx.body = await createBloCon(ctx, { image, content })
})

module.exports = router