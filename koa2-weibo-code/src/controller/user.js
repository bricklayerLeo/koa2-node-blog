/**
 * @description user controller
 *
 *
 */
const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExist } = require('../model/ErrorInfo')

/**
 * @description 用户是否存在
 * @param {string} username 用户名
 */

async function isExit(username) {
    //业务逻辑处理 
    //调取服务数据
    //同意返回格式
    const userInfo = await getUserInfo(username)
    if (userInfo) {
        return new SuccessModel(userInfo)
    } else {
        return new ErrorModel(registerUserNameNotExist)
    }
}

module.exports = {
    isExit
}