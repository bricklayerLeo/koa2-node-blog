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
        attributes: ['id', 'userName', 'nickName', 'city', 'picture'],
        where: whereOpt
    })

    if (result == null) {
        return result
    }
    const formatRes = formatUser(result.dataValues)
    return formatRes
}


/**
 * 
 * @param {string} userName
 * @param {string} password
 * @param {string} nickName
 * @param {number} gender 性别
 */
async function createUser({ userName, password, nickName, gender = 3 }) {
    await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    })
}

/**
 * @description 修改用户信息
 * 
 */

async function updateUser({ newPassword, newNickName, newCity, NewPicture }, { userName, password }) {

    const updateUser = {}
    if (newPassword) {
        updateUser.password = newPassword
    }
    if (newNickName) {
        updateUser.nickName = newNickName
    }
    if (newCity) {
        updateUser.city = newCity
    }
    if (NewPicture) {
        updateUser.picture = NewPicture
    }


    const whereData = {
        userName
    }
    if (password) {
        whereData.password = password
    }
    const res = await User.update(
        updateUser,
        {
            where: whereData
        }
    )
    return res[0] > 0  //修改的行数
}
module.exports = {
    getUserInfo,
    createUser,
    updateUser
}