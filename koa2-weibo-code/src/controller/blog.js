/**
 * @description blog controller
 *
 *
 */
const { createBlog } = require('../services/blog')
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



module.exports = {
    createBloCon,
}