const router = require('koa-router')()
const loginCheck = require('../../middlewares/loginCheck')
const blogValidate = require('../../validate/blog')
const { genValidator } = require('../../middlewares/validate')
const { createBloCon, getProfileBlogList, getSquareBlogList } = require('../../controller/blog')
const { follow, unFollow } = require('../../controller/user-relation')

router.prefix('/api/blog')

router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
    const { image, content } = ctx.request.body
    ctx.body = await createBloCon(ctx, { image, content })
})

router.get('/profile', loginCheck, async (ctx, next) => {
    ctx.body = await getProfileBlogList(ctx)
})


router.get('/square', loginCheck, async (ctx, next) => {
    ctx.body = await getSquareBlogList(ctx)
})

//  关注
router.post('/follow', loginCheck, async (ctx, next) => {
    ctx.body = await follow(ctx)
})

router.post('/unfollow', loginCheck, async (ctx, next) => {
    ctx.body = await unFollow(ctx)
})


module.exports = router