// const Sequelize = require('sequelize')
// const conf = {
//     host: 'localhost',
//     dialect: 'mysql' //声明操作 mysql
// }
// 线上环境使用 连接池
// conf.pool = {
//     max: 5, //连接池最大的链接数量
//     min: 0, //最小
//     idle: 10000  //如果 一个连接池 10s 之内没被使用 则释放
// }
// const seq = new Sequelize('koa2weibo', 'root', 'lwlw123456', conf)
// module.exports = seq

//测试链接
// seq.authenticate().then(() => {
//     console.log('ok');
// }).catch(() => {
//     console.log('错误');
// })

/**
 * @description sequelize 实例
 * @author 双越老师
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF
const conf = {
    host,
    dialect: 'mysql'
}

if (isTest) {
    conf.logging = () => { }
}

// 线上环境，使用连接池
if (isProd) {
    conf.pool = {
        max: 5, // 连接池中最大的连接数量
        min: 0, // 最小
        idle: 10000  // 如果一个连接池 10 s 之内没有被使用，则释放
    }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq
