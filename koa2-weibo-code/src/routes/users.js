const router = require('koa-router')()
const jwt = require('jsonwebtoken')

const util = require('util')
const verify = util.promisify(jwt.verify)

router.prefix('/users')

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  let userInfo
  console.log(ctx.request.body);
  if (userName === 'zhangsan' && password === '123456') {
    console.log('111');

    userInfo = {
      userId: 1,
      userName: '张三',
      gender: 1
    }
  }
  let token
  if (userInfo) {
    token = jwt.sign(userInfo, 'UHHdid_+#$FS^#%66433^^&$84', {
      expiresIn: '1h'
    })
  }

  if (userInfo == null) {
    ctx.body = {
      errno: -1,
      msg: '登陆失败'
    }
    return
  }
  ctx.body = {
    errno: 0,
    data: token
  }
})

//模拟获取用户信息

router.get('/getUserInfo', async (ctx, next) => {
  const token = ctx.header.authorization
  try {
    //token 解密
    const payload = await verify(token.split(' ')[1], 'UHHdid_+#$FS^#%66433^^&$84')
    ctx.body = {
      error: 0,
      userInfo: payload
    }
  } catch (error) {
    ctx.body = {
      error: -1,
      msg: 'verify token fail'
    }
  }
})



module.exports = router
