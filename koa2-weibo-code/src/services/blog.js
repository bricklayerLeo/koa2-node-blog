/**
 * @description 数据模型入口文件
 * 
 */

const { Blog, User } = require('../db/model/index')
// const Blog = require('../db/model/Blog')
// const User = require('../db/model/User')

//上面三行 造成了一个大问题 排除很久 。   因为 外键关联 是在index文件里面 做的  单独导入 blog user 的模块 导致外键
//关联没生效   因为单独的 blog  user 模块的没做外键关联   只有 index里面的 blog,user 才做了外键关联。真踩狗屎
const { formatUser } = require('./_format')
// const { formatUser } = require('./_format')



async function createBlog({ image, content, userId }) {
    const res = await Blog.create({ image, content, userId })
    return res.dataValues
}

/**
 * 
 * @description  根据用户名 获取个人博客列表 
 */

async function getPersonBlogList({ userName, pageIndex = 0, pageSize = 10 }) {
    // const selectBlog = { pageIndex, pageSize }
    const userwhereData = {}
    if (userName) {
        userwhereData.userName = userName
    }
    console.log('------------pageIndex2---------------', pageIndex);
    const res = await Blog.findAndCountAll(
        {
            limit: pageSize,
            offset: pageSize * pageIndex,
            order: [['id', 'desc']],//根据id倒叙
            include: [
                {
                    model: User,
                    attributes: ['userName', 'nickName', 'picture'],
                    where: userwhereData
                }
            ]
        },
    )
    // // 拼接查询条件
    // console.log('------name------------', userName);
    // const userWhereOpts = {}
    // if (userName) {
    //     userWhereOpts.userName = userName
    // }

    // // 执行查询
    // const res = await Blog.findAndCountAll({
    //     limit: pageSize, // 每页多少条
    //     offset: pageSize * pageIndex, // 跳过多少条
    //     order: [
    //         ['id', 'desc']
    //     ],
    //     include: [
    //         {
    //             model: User,
    //             attributes: ['userName', 'nickName', 'picture'],
    //             where: userWhereOpts
    //         }
    //     ]
    // })

    // return res.dataValues
    // res.count, //所有的总数 
    const blogList = res.rows.map(blog => {
        const blogVal = blog.dataValues
        const user = formatUser(blogVal.user.dataValues)
        Object.assign(blogVal, user)
        return blogVal
    })
    return {
        count: res.count,
        blogList
    }
}




module.exports = {
    createBlog,
    getPersonBlogList
}