/**
 * @description 数据模型入口文件
 * 
 */

const User = require('../db/model/User')
const { formatUser } = require('./_format')
/**
 * 获取用户信息
 * @param {string} username 
 * @param {string} password 
 */
async function getUserInfo(userName, password) {
    console.log(User, 'User');
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName'],
        where: whereOpt
    })

    if (result == null) {
        return result
    }
    const formatRes = formatUser(result.dataValues)
    return formatRes
}
module.exports = {
    getUserInfo
}