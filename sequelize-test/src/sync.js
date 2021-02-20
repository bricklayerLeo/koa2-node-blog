const Sequelize = require('sequelize')
const seq = require('./seq')
require('./model')

seq.authenticate().then(() => {
    console.log('ok');
}).catch(() => {
    console.log('错误');
})

//执行同步
seq.sync({ force: true }).then(() => {  //{ force: true }数据库有同名的表强制删除
    console.log('sync ok');
    process.exit() //把程序退出 sequelize退出进程 否则一直占用进程 
})