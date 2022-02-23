module.exports = {
    lintOnSave: false,//closeEslin
    //proxy代理
    devServer: {
        inline:true, //热更新
        proxy: {
            '/api':{
                target:'http://39.98.123.211'
            }
        },
    },
}