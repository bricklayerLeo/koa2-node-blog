/**
 * @description 用户关注关系
 */

const seq = require('../seq')
const { STRING, INTEGER, TEXT } = require('../type')

const UserRelation = seq.define('userRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户  id'
    },
    followerId: {
        type: INTEGER,
        allowNull: false,
        comment: '被关注用户的 id'
    },
})

module.exports = UserRelation