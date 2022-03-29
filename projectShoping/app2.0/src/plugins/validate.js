import Vue from 'vue'
import { ValidationProvider, extend, localize } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules' // 验证规则导入
// import CN from 'vee-validate/dist/locale/zh_CN.json' // 加载语言包


extend('required', required)
extend('email', email)

localize('zh_CN', {
    name: 'zh_CN',
    names: { 
        phone:'手机号',
        code:'验证码',
        password:'密码',
        password1:'确认密码',
        isCheck:'同意协议'
    },
    messages: {
        // your messages.
        _default: (field) => `${field}无效`,
        after: (field, [target]) => `${field}必须在${target}之后`,
        alpha_dash: (field) => `${field}能够包含字母数字字符、破折号和下划线`,
        alpha_num: (field) => `${field}只能包含字母数字字符`,
        alpha_spaces: (field) => `${field}只能包含字母字符和空格`,
        alpha: (field) => `${field}只能包含字母字符`,
        before: (field, [target]) => `${field}必须在${target}之前`,
        between: (field, [min, max]) => `${field}必须在${min}与${max}之间`,
        confirmed: (field, [confirmedField]) =>
            `${field}不能和${confirmedField}匹配`,
        credit_card: (field) => `${field}格式错误`,
        date_between: (field, [min, max]) => `${field}必须在${min}和${max}之间`,
        date_format: (field, [format]) => `${field}必须符合${format}格式`,
        decimal: (field, [decimals = '*'] = []) =>
            `${field}必须是数字，且能够保留${decimals === '*' ? '' : decimals}位小数`,
        digits: (field, [length]) =>
            `${field}必须是数字，且精确到${length}位数`,
        dimensions: (field, [width, height]) =>
            `${field}必须在${width}像素与${height}像素之间`,
        email: (field) => `${field}不是一个有效的邮箱`,
        ext: (field) => `${field}不是一个有效的文件`,
        image: (field) => `${field}不是一张有效的图片`,
        included: (field) => `${field}不是一个有效值`,
        integer: (field) => `${field}必须是整数`,
        ip: (field) => `${field}不是一个有效的地址`,
        length: (field, [length, max]) => {
            if (max) {
                return `${field}长度必须在${length}到${max}之间`
            }
            return `${field}长度必须为${length}`
        },
        max: (field, [length]) => `${field}不能超过${length}个字符`,
        max_value: (field, [max]) => `${field}必须小于或等于${max}`,
        mimes: (field) => `${field}不是一个有效的文件类型`,
        min: (field, [length]) => `${field}必须至少有${length}个字符`,
        min_value: (field, [min]) => `${field}必须大于或等于${min}`,
        excluded: (field) => `${field}不是一个有效值`,
        numeric: (field) => `${field}只能包含数字字符`,
        regex: (field) => `${field}格式无效`,
        required: (field) => `请输入${field}`,
        url: (field) => field + '不是一个有效的url'
    }
})
// 手机号码验证
extend('mobile', {
    message: () => `请您输入正确的手机号码`,
    validate: value => value.length === 11 && /^(((13[0-9]{1})|(14[57]{1})|(15[012356789]{1})|(17[03678]{1})|(18[0-9]{1})|(19[89]{1})|(16[6]{1}))+\d{8})$/.test(value)
})
//验证码效验
extend('code', {
    message: () => `验证码为4位的数字`,
    validate: value => value.length == 4 && /^\d{4}$/.test(value)
})
//密码验证
extend('password', {
    message: () => `密码至少包含 数字和英文，长度6-20,不能出现空格`,
    validate: value =>/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)
})
//二次密码确认验证
extend('repeatPassword', {
    message: () => `确认密码需要和密码一致`,
    validate: (value,twoValue,params) => {
        console.log(value,'value')
        console.log(twoValue,'twoValue')
    }
})
//协议必须勾选
extend('isCheck',{
    message:(field)=>field+'必须勾选',
    validate:(value)=>{
        return value
    }
})
// 设置
Vue.component('ValidationProvider', ValidationProvider) 