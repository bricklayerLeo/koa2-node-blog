/**
 * @description 粉丝 controller
 *
 *
 */
const { getUsersByFollower, addFollower, deleteFollower } = require('../services/user-relation')
// const { getSquareCacheList } = require('../cache/blog')
const { SuccesModel, ErrorModel } = require('../model/ResModel')
const doCrypto = require('../utils/cryp')
const jwt = require('jsonwebtoken')

const util = require('util')
const verify = util.promisify(jwt.verify)

/**
 * 获取用户粉丝
 * @param {*} ctx 
 */


/**
 * @description 获取个人主页微博
 */
async function getFans(userId) {
    const { count, fanList } = await getUsersByFollower(userId)
    return { count: count ? count : 0, fanList: fanList ? fanList : [] }

}

/**
 * 
 * @param {number} id  当前登录的用户id
 * @param {number} userId   要被关注的用户 id
 */
async function follow(ctx) {
    const { userId } = ctx.request.body
    let token = ctx.request.headers.authorization
    const payload = await verify(token.split(' ')[1], 'UHHdid_+#$FS^#%66433^^&$84')
    const id = payload.userInfo.id

    try {
        await addFollower(id, userId)
        return new SuccesModel()
    } catch (error) {
        return new ErrorModel({
            errno: 10011,
            message: '添加关注失败'
        })
    }
}

/**
 * 取消关注接口
 */
async function unFollow(ctx) {
    const { userId } = ctx.request.body
    console.log('-----------userId-------------', userId);
    let token = ctx.request.headers.authorization
    const payload = await verify(token.split(' ')[1], 'UHHdid_+#$FS^#%66433^^&$84')
    const id = payload.userInfo.id
    const res = await deleteFollower(id, userId)
    if (res) {
        return new SuccesModel()
    }
    return new ErrorModel({
        errno: 10011,
        message: '取消关注失败'
    })
}

module.exports = {
    getFans,
    follow,
    unFollow
}