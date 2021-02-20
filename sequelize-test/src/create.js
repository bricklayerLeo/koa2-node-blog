const { Blog, User } = require('./model')

!(async function () {
    //创建用户
    const zhangsan = await User.create({
        userName: 'zhangsan',
        password: '123',
        nickName: '张三'
    })
    console.log('zhangsan', zhangsan.dataValues);

    const lisi = await User.create({
        userName: 'lisi',
        password: '123456',
        nickName: 'wangermazo'
    })

    const blog1 = await Blog.create({
        title: '标题1',
        content: '内容1',
        userId: zhangsan.dataValues.id
    })

    const blog2 = await Blog.create({
        title: '标题2',
        content: '内容2',
        userId: lisi.dataValues.id
    })

    const blog3 = await Blog.create({
        title: '标题3',
        content: '内容3',
        userId: lisi.dataValues.id
    })

})()