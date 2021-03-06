/**
 * @description  微博缓存层
 */


const { get, set } = require('./_redis')
const { getPersonBlogList } = require('../services/blog')

//redis key 前缀
const KEY_PREFIC = 'weibo:square:'

/**
 * 获取广场页 列表的缓存
 * @param {*} pageIndex 
 * @param {*} pageSize 
 */
async function getSquareCacheList({ pageIndex, pageSize }) {
    const key = `${KEY_PREFIC}${pageIndex}${pageSize}`
    //尝试获取缓存
    const cacheResult = await get(key)
    if (!cacheResult) { //没有缓存 或者缓存过期 则 读取数据库
        const result = await getPersonBlogList({ pageIndex, pageSize })
        set(key, result, 60)
        return result
    }
    return cacheResult  //获取缓存成功
}

module.exports = {
    getSquareCacheList
}