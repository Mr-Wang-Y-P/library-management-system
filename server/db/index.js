let mysql = require('mysql')

let db = mysql.createConnection({
    host: '121.199.6.69', //数据库IP地址
    user: 'library-manage',          //数据库登录账号
    password: '123456',      //数据库登录密码
    database: 'library-manage'       //要操作的数据库
})

module.exports = db