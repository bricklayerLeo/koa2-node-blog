const Sequelize = require('sequelize')
const seq = require('./seq')

//创建user 模型 数据表的名字是users

const User = seq.define('user', { //数据表会自动编成users
    //id 会自动创建 ，并设为主键，自增
    userName: {
        type: Sequelize.STRING, //VARCHAR(255)
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING, //VARCHAR(255)
        allowNull: false,
    },
    nickName: {
        type: Sequelize.STRING, //VARCHAR(255)
        comment: '昵称'
    }
})

const Blog = seq.define('blog', {
    title: {
        type: Sequelize.STRING, //VARCHAR(255)
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT, //VARCHAR(255)
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER, //VARCHAR(255)
        allowNull: false,
    }
})

//外键关联  写法一
Blog.belongsTo(User, {
    //创建外键 Blog.userId -> User.id  
    foreignKey: 'userId'  //默认情况下自动关联id
})
//写法 二
User.hasMany(Blog, {
    //创建外键 Blog.userId -> User.id  
    foreignKey: 'userId'  //默认情况下自动关联id
})

//写法一 和写法二  区别 做查询的时候  
//写法一先查Blog带出user  写法二 先查user 带出blog


module.exports = {
    User,
    Blog
}