const { Blog, User } = require('./model')

!(async function () {

    const updateList = await User.update(
        { nickName: 'zhangsan001' },
        {
            where: {
                userName: 'zhangsan'
            }
        }
    )
    console.log('===updateList===', updateList); //修改成功 判断update[0]>0
})()