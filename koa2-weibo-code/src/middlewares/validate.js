/**
 * @description 中间件 定义校验
 */
// const validateFn = require('../../validate/user')

const { ErrorModel } = require("../model/ResModel")
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')


function genValidator(validateFn) {
    async function validator(ctx, next) {
        console.log('ctx.request.body', ctx.request.body);
        // const { userName, password, gender } = ctx.request.body
        // console.log('111');
        // console.log('gender', typeof gender);
        const error = validateFn(ctx.request.body)
        if (error) {
            ctx.body = new ErrorModel(error)
            return
        }

        //验证成功通过
        await next()
    }
    return validator
}

module.exports = {
    genValidator
}