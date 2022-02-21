module.exports = {
    lintOnSave: false,//closeEslin
    //proxy代理
    devServer: {
        proxy: {
            '/api':{
                target:'http://39.98.123.211'
            }
        },
    },
}