module.exports = {
    lintOnSave: false,//closeEslin //关闭eslink 不需要就删除
    productionSourceMap:false,
    //proxy代理
    devServer: {
        inline:true, //热更新 改了代码 浏览器自动刷新
        proxy: {
            '/api':{
                target:'http://39.98.123.211' //填写你服务器的地址
            }
        },
    },
}