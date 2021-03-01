/**
 * @description utils controller
 */
const path = require('path')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')
const { SuccesModel } = require('../model/ResModel')

//存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
//文件最大按体积 1M
const MIX_SIZE = 1024 * 1024 * 1024

/**
 * @param {string} name 文件名字
 * @param {string} filePath 文件路径
 * @param {string} size 文件大小
 * @param {string} type 文件类型
 */
async function saveFile({ size, filePath, name, type }) {
    console.log('---------------------------');
    if (size > MIX_SIZE) {
        //文件过大 删除掉 避免硬盘空间
        //所有文件操作 都是异步的 删除路径就是filePath
        await fse.remove(filePath)
        return ErrorModel(uploadFileSizeFailInfo)
    }
    //使用koaFrom 默认有存储路径  我们可以移动文件 到自己像存储的地方

    //移动文件

    //加上 时间错  防止重名 
    const fileName = Date.now() + '.' + name
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName)//目的地
    await fse.move(filePath, distFilePath)

    return new SuccesModel({
        url: '/' + fileName
    })

}

module.exports = saveFile