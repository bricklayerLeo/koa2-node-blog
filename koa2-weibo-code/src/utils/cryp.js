/**
 * @description 加密
 */

const crypto = require('crypto') //node 自带的加密方式 无需下载
const { CRYPTO_SERCET_KEY } = require('../conf/secret')

//密钥
const SECRET_KEY = CRYPTO_SERCET_KEY


/**
 * @description md5加密
 * @param {string} content  明文
 */
function _md5(content) {
    const md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

function doCrypto(content) {
    const str = `password=${content}&key=${CRYPTO_SERCET_KEY}`
    return _md5(str)
}

module.exports = doCrypto