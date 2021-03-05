/**
 * @description 数据模型入口文件
 * 
 */

const Blog = require('../db/model/Blog')
// const { formatUser } = require('./_format')



async function createBlog({ image, content, userId }) {
    const res = await Blog.create({ image, content, userId })
    return res.dataValues
}




module.exports = {
    createBlog
}