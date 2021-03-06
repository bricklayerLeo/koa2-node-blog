/**
 * @description 用户粉丝
 * 
 */

// const UserRelation = require('../db/model/UserRelation')
const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取用户粉丝
 * @param {number} followerId 
 */

async function getUsersByFollower(followerId) {
    const res = await User.findAndCountAll({
        attributes: ['id', 'userName', 'nickName', 'picture'],
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: UserRelation,
                where: {
                    followerId
                }
            }
        ]
    })
    // res.count, //所有的总数 
    let fanList = res.rows.map(row => row.dataValues)
    fanList = formatUser(fanList)
    return {
        count: res.count,
        fanList
    }
}



/**
 *  获取关注人列表
 * @param {number} userId  
 */

async function getFollowerByUser(userId) {
    const res = await UserRelation.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'userName', 'nickName', 'picture'],
            }
        ],
        where: {
            userId
        }
    })
    // res.count, //所有的总数 
    let focusList = res.rows.map(row => row.dataValues)
    focusList = focusList.map(item => {
        let user = item.user.dataValues
        user = formatUser(user)
        return user
    })


    // focusList = formatUser(focusList)
    return {
        count: res.count,
        focusList
    }
}



/**
 * 添加关注 关系
 * @param {number} userId  用户 id
 * @param {number} followerId  被关注 用户id
 */
async function addFollower(userId, followerId) {
    const res = await UserRelation.create({
        userId,
        followerId
    })

    return res.dataValues
}

/**
 * 取消关注
 */
async function deleteFollower(userId, followerId) {
    const res = await UserRelation.destroy({
        where: {
            userId,
            followerId
        }
    })

    return res > 0
}

module.exports = {
    getUsersByFollower,
    addFollower,
    deleteFollower,
    getFollowerByUser
}