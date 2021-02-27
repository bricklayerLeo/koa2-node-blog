/**
 * @description user controller
 *
 *
 */
const { getUserInfo, createUser } = require('../services/user')
const { SuccesModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExist, registerUserNameExist, registerFailInfo } = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')
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
        return new SuccesModel('用户已存在')
    } else {
        return new ErrorModel(registerUserNameNotExist)
    }
}

/**
 * 
 * @param {*} param0 
 */
async function register({ userName, password, gender }) {
    const userInfo = await isExit(userName)
    if (userInfo.data) {
        console.log('aaaaa');
        return new ErrorModel(registerUserNameExist)
    }
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccesModel()
    } catch (error) {
        return new ErrorModel(registerFailInfo)
    }

}

module.exports = {
    isExit,
    register
}