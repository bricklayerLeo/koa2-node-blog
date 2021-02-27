/**
 * @description 数据模型建立
 */

const seq = require('../seq')
const { STRING, DECIMAL } = require('../type')

const User = seq.define('user', {
    userName: {
        type: STRING,
        allowNull: false,
        unique: true, //  唯一不能重复
        comment: '用户名唯一'
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: '密码'
    },
    nickName: {
        type: STRING,
        allowNull: false,
        comment: '昵称'
    },
    gender: {
        type: DECIMAL,
        allowNull: false,
        defultValue: 3,//什么都不传默认值3
        comment: '性别(1 男性 2女性 3 保密)'
    },
    picture: {
        type: STRING,
        comment: '头像 图片地址'
    }
    ,
    city: {
        type: STRING,
        comment: '城市'
    }
})

module.exports = User