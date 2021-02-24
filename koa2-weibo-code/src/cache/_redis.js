/**
 * @description 连接redis 的方法
 * @author PINGDIYSL
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db.js')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
    console.error('redis error')
})


/**
 * redis set
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout 过期时间 
 */
function set(key, val, timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)
    redisClient.expire(key, timeout)
}

/**
 * redis get
 * @param {string} key 
 */

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            }
            try {
                resolve(
                    JSON.parse(val)
                )
            } catch (error) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    set
}