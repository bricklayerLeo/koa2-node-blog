const seq = require('./seq')

require('./model/index')

//连接数据库
seq.authenticate().then(() => {
    console.log('ok');
}).catch(() => {
    console.log('err');
})

//数据模型同步到数据库
seq.sync({ force: true }).then(() => {
    console.log('sync ok ');
    process.exit()
})

//打开终端执行下面代码 启动同步
// node  src / db / sync.js