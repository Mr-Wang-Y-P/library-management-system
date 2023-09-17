let express = require('express')
let app = express()
let cors = require('cors')
let bodyParser = require('body-parser')
let router = require('./router')

app.use(bodyParser.json());  //配置解析，用于解析json和urlencoded格式的数据
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())              //配置跨域
app.use(router) 



app.listen(8800, () => {
    console.log('服务器启动成功。 ---> http://127.0.0.1:8800');
}) // 5500 是端口号，若被占用，自行修改即可