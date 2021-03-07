/**
 * @description blog controller
 *
 *
 */
const { createBlog, getPersonBlogList } = require('../services/blog')
const { getFans, getFocus } = require('./user-relation')
const { getSquareCacheList } = require('../cache/blog')
const { SuccesModel, ErrorModel } = require('../model/ResModel')
const xss = require('xss')
// const { registerUserNameNotExist, changeInfoFailInfo, loginFailInfo, registerUserNameExist, registerFailInfo } = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')
const jwt = require('jsonwebtoken')

const util = require('util')
const verify = util.promisify(jwt.verify)


/**
 * @description 用户是否存在
 * @param {string} username 用户名
 */

async function createBloCon(ctx, { image, content }) {
    let token = ctx.request.headers.authorization
    const payload = await verify(token.split(' ')[1], 'UHHdid_+#$FS^#%66433^^&$84')
    const userId = payload.userInfo.id
    const res = await createBlog({
        image,
        content: xss(content),
        userId
    })

    if (res) {
        return new SuccesModel(res)
    } else {
        return new ErrorModel('创建博客失败')
    }

}
/**
 * @description 获取个人主页微博
 */
async function getProfileBlogList(ctx) {
    let token = ctx.request.headers.authorization
    const payload = await verify(token.split(' ')[1], 'UHHdid_+#$FS^#%66433^^&$84')
    const curName = payload.userInfo.userName

    const { userName, pageIndex, id } = ctx.request.query
    if (!pageIndex) {
        let pageIndex = 0
    }
    const res = await getPersonBlogList({ userName, pageIndex, pageSize: 5 })

    //粉丝列表
    const res1 = await getFans(id)
    //关注人列表
    const res2 = await getFocus(id)

    //我是否关注了此人
    const Ishas = res1.fanList.some(e => {
        return e.userName === curName
    });


    const blogList = res.blogList
    return new SuccesModel({
        blogList,
        isEmpty: blogList.length === 0,
        pageSize: 5,
        count: res.count,
        pageIndex,
        fans: res1,
        Ishas,
        focusList: res2

    })
}

/**
 * @description  广场页面微博列表
 */
async function getSquareBlogList(ctx) {
    const { pageIndex } = ctx.request.query
    // getSquareCacheList
    const res = await getSquareCacheList({ pageIndex, pageSize: 5 })


    const blogList = res.blogList
    return new SuccesModel({
        blogList,
        isEmpty: blogList.length === 0,
        pageSize: 5,
        count: res.count,
        pageIndex

    })
}


module.exports = {
    createBloCon,
    getProfileBlogList,
    getSquareBlogList
}