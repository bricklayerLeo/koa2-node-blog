const { Blog, User } = require('./model')

!(async function () {
    //查询一条记录
    // const zhangsan = await User.findOne({
    //     where: {
    //         userName: 'zhangsan'
    //     }
    // })
    // console.log(zhangsan.dataValues);


    //查询特定的列(一行里面的某些数据)
    // const zhangsanName = await User.findOne({
    //     attributes: ['userName', 'nickName'],
    //     where: {
    //         userName: 'zhangsan'
    //     }
    // })
    // console.log(zhangsanName.dataValues);


    //查询一个表
    // const blog1 = await Blog.findAll({
    //     where: {
    //         userId: 2
    //     },
    //     order: [
    //         ['id', 'desc']
    //     ]
    // })
    // console.log('blog1', blog1.map(blog => blog.dataValues));
    // console.log('=======================');
    // console.log(blog1);
    // console.log('=======================');


    //分页查询

    // const blogPageList = await Blog.findAll({
    //     limit: 2, //限制本次查询2条
    //     offset: 0,  // 跳过多少条
    //     order: [
    //         ['id', 'desc']
    //     ]
    // })
    // console.log(blogPageList.map(blog => blog.dataValues));

    //查询总数 

    // const vlogListCount = await Blog.findAndCountAll({
    //     limit: 2, //限制本次查询2条
    //     offset: 0,  // 跳过多少条
    //     order: [
    //         ['id', 'desc']
    //     ]
    // })

    // console.log(
    //     vlogListCount.count, //所有的总数 
    //     vlogListCount.rows.map(blog => blog.dataValues)
    // );

    //外键查询 连表查询  model.js  写法一
    const blogListwithusers = await Blog.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName'],
                // where: {
                //     userName:'zhangsan'
                // }
            }
        ]
    })
    console.log(
        blogListwithusers.count, //所有的总数 
        blogListwithusers.rows.map(blog => {
            const blogVal = blog.dataValues
            blogVal.user = blogVal.user.dataValues
            return blogVal

        })
    );

})()