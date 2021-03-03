/**
 * @description user controller
 *
 *
 */
const { getUserInfo, createUser, updateUser } = require('../services/user')
const { SuccesModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExist, changeInfoFailInfo, loginFailInfo, registerUserNameExist, registerFailInfo } = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')
const jwt = require('jsonwebtoken')

const util = require('util')
const { settings } = require('cluster')
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
        token = jwt.sign({ userInfo, time: new Date().getTime(), timeout: 1000 * 60 * 60 * 2 }, 'UHHdid_+#$FS^#%66433^^&$84',
            // {
            // expiresIn: '1h'
            // }
        )
        return new SuccesModel(token)
    } else {
        return new ErrorModel(loginFailInfo)
    }
}


/**
 * @description 获取用户设置
 */

async function setting(ctx) {
    let token = ctx.request.headers.authorization
    console.log('----ctx.request.headers---', token);
    const payload = await verify(token.split(' ')[1], 'UHHdid_+#$FS^#%66433^^&$84')
    console.log(payload, '-----payload.userInfo------');
    if (payload.userInfo) {
        return new SuccesModel(payload.userInfo)
    } else {
        return new ErrorModel('失败获取用户数据')
    }
}

/**
 * @description 修改个人信息
 * @param {*} ctx 
 * @param {*} param1 
 */

async function changeuserInfo(ctx, { nickName, city, picture }) {
    let token = ctx.request.headers.authorization
    const payload = await verify(token.split(' ')[1], 'UHHdid_+#$FS^#%66433^^&$84')
    const userName = payload.userInfo.userName
    console.log('--------payload.userInfo--------', payload.userInfo);
    const res = await updateUser(
        { newNickName: nickName, newCity: city, NewPicture: picture },
        { userName }
    )
    if (res) {
        const userInfo = Object.assign(payload.userInfo, { nickName, city, picture })
        const newToken = jwt.sign({ userInfo, time: new Date().getTime(), timeout: 1000 * 60 * 60 * 2 }, 'UHHdid_+#$FS^#%66433^^&$84')
        ctx.res.setHeader('authorization', newToken);
        return new SuccesModel()
    }
    return new ErrorModel(changeInfoFailInfo)
}


async function changePassword(ctx, { password, newPassword }) {
    let token = ctx.request.headers.authorization
    const payload = await verify(token.split(' ')[1], 'UHHdid_+#$FS^#%66433^^&$84')
    const userName = payload.userInfo.userName
    const res = await updateUser(
        { newPassword: doCrypto(newPassword) },
        { userName, password: doCrypto(password) }
    )

    if (res) {
        return new SuccesModel()
    }
    return new ErrorModel(changeInfoFailInfo)

}

async function loginOut() {

}
module.exports = {
    isExit,
    register,
    login,
    setting,
    changeuserInfo,
    changePassword,
    loginOut
}