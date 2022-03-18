// vue 插件自定义指令 向外暴露对象 必须拥有install方法
let myPlugins={};

myPlugins.install = function(Vue){
    console.log('调用自定义插件..',Vue)
}

export default myPlugins