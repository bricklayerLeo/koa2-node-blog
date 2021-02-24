const Sequelize = require('sequelize')
const conf = {
    host: 'localhost',
    dialect: 'mysql' //声明操作 mysql
}
// 线上环境使用 连接池
// conf.pool = {
//     max: 5, //连接池最大的链接数量
//     min: 0, //最小
//     idle: 10000  //如果 一个连接池 10s 之内没被使用 则释放
// }
const seq = new Sequelize('koa2weibo', 'root', 'lwlw123456', conf)
module.exports = seq

//测试链接
// seq.authenticate().then(() => {
//     console.log('ok');
// }).catch(() => {
//     console.log('错误');
// })