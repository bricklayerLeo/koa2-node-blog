/**
 * @description 微博 数据模型
 */

const seq = require('../seq')
const { STRING, INTEGER, TEXT } = require('../type')

const Blog = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    // title: {
    //     type: STRING,
    //     allowNull: false,
    // },

    content: {
        type: TEXT,
        allowNull: false,
    },
    // title: {
    //     type: STRING,
    //     allowNull: false,
    // },
    image: {
        type: STRING,
    }
})

module.exports = Blog