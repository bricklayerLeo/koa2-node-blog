/**
 * @description user controller
 *
 *
 */
const { getUserInfo, createUser } = require('../services/user')
const { SuccesModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExist, loginFailInfo, registerUserNameExist, registerFailInfo } = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')
const jwt = require('jsonwebtoken')

const util = require('util')
const verify = util.promisify(jwt.verify)


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

/**
 * @description  login 登录
 */

async function login({ ctx, userName, password }) {
    console.log('3333');
    password = doCrypto(password)
    const userInfo = await getUserInfo(userName, password)
    if (userInfo) {
        // if (ctx.session.userInfo == null) {
        //     ctx.session.userInfo = userInfo
        // }
        token = jwt.sign(userInfo, 'UHHdid_+#$FS^#%66433^^&$84', {
            expiresIn: '1h'
        })
        return new SuccesModel(token)
    } else {
        return new ErrorModel(loginFailInfo)
    }
}

module.exports = {
    isExit,
    register,
    login
}