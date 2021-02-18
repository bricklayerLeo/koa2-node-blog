# koa2-node-blog
1.项目搭建    
npm i -g koa-generator   下载koa2
koa2 -e koa2-weibo-code 新建项目架构  
2.配置环境变量
npm i cross-env -D

  "scripts": {
    "start": "node bin/www",
    "dev": "cross-env NODE_ENV=dev ./node_modules/.bin/nodemon bin/www",
    "prd": "pm2 start bin/www",
    "test": "echo \"Error: no test specified\" && exit 1"
  }, 