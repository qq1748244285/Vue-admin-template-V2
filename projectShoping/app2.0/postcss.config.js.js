module.exports ={
    plugins:{
        "autoprefixer":{browsers:'last 5 version'},
        "postcss-px2rem-exclude":{
            remUnit:75, //设计稿/10 例如 1920设计稿 则 等于 192
            exclude:/node_modules|folder_name/i
        }
    }
}