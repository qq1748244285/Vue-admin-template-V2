import axios from 'axios'
//引入进度条插件
import nprogress from 'nprogress'
//引入进度条插件样式
import 'nprogress/nprogress.css';
//引入store
import store from '@/store';
//获取token
import { GetToken } from '@/utils/token'

//创建一个axios 实例  并配置实例对象属性
const requests = axios.create({
    baseURL: '/api', //基础路径
    timeout: 5000, //请求超时时间 毫秒    
})


//请求拦截器
requests.interceptors.request.use((config) => {
    //config 配置对象 包含请求头headers
    let uuid_token = store.state.Details.uuid_token || '';
    //token令牌
    let token = GetToken() || '';
    //存入headres
    if (token) {
        config.headers.token = token;
    }
    if (uuid_token) {
        //userTempId 和后台协商好的key
        config.headers.userTempId = uuid_token;
    }
    //进度条开始加载
    nprogress.start();

    return config
})

//响应拦截器
requests.interceptors.response.use((res) => {
    //进度条加载结束
    nprogress.done();
    return res.data;
}, (err) => {
    console.log(err, 'request_err')
    return Promise.reject(new Error('fail error'))
})

//暴露
export default requests 