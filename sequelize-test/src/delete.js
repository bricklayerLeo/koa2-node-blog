const { Blog, User } = require('./model')

!(async function () {
    // const deleteData = await Blog.destroy(
    //     {
    //         where: {
    //             id: '3'
    //         }
    //     })
    // console.log('===deleteData===', deleteData); //修改成功 判断update[0]>0

    const deleteData = await User.destroy(
        {
            where: {
                id: '2'
            }
        })
    console.log('===deleteData===', deleteData); //修改成功 判断update[0]>0

})()