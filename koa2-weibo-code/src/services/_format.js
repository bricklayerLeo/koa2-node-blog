/**
 * @description 数据格式化
 */

const { DEFAULT_PICTURE } = require('../conf/constant')
/**
 * 用户默认头像
 * @param {Object} obj 用户对象 
 */
function _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

/**
 * 初始化用户信息
 * @param {Arrary|Object} list  //用户列表 或者单个用户对象
 */
function formatUser(list) {
    if (list == null) {
        return list
    }
    if (list instanceof Array) {
        //数组 列表用户
        return list.map(_formatUserPicture)
    }
    //单个对象
    return _formatUserPictur(list)
}

module.exports = formatUser