let db = require('../db/index')

exports.getAll = (req, res) => {
    var sql = 'select * from user'
    db.query(sql, (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}
exports.get = (req, res) => {
    if (req.query.phone) {
        var sql = 'select * from user where  concat(phone,name,userId,email) like ?'
        console.log(req.query.phone);
        db.query(sql, `%${req.query.phone}%`, (err, data) => {
            if (err) {
                return res.send('错误：' + err.message)
            }
            res.send(data)
        })
    }
}
exports.getUser = (req, res) => {
    if (req.query.userId) {
        var sql = 'select * from user where userId =?'
        console.log(req.query.userId);
        db.query(sql, req.query.userId, (err, data) => {
            if (err) {
                return res.send('错误：' + err.message)
            }
            res.send(data)
        })
    }
}
exports.delete = (req, res) => {
    if (req.body.params) {
        var sql = 'delete from user where userId=?'
        console.log(req.body.params.userId);
        db.query(sql, req.body.params.userId,
            (err) => {
                if (err) {
                    console.log(err.message);
                    return res.status(500).send('删除数据失败');
                }
                console.log('删除数据成功');
                return res.status(200).send('success');
            })
    }
}

exports.add = (req, res) => {
    if (req.body.params) {
        var request = req.body.params
        var sql = 'select * from user where phone=?'
        console.log(request.phone,request.image,request.userId);
        db.query(sql, request.phone, (err, data) => {
            if (data.length > 0) {
                return res.status(500).send('电话号码重复');
            } else {
                console.log(request.phone,request.image,request.userId);
                var sql = 'insert into user (userId,name,phone,email,password,image,type) values(?,?,?,?,?,?,?)'
                db.query(sql, [request.userId, request.name, request.phone, request.email, request.password, request.image, request.type],
                    (err) => {
                        if (err) {
                            console.log(err.message);
                            return res.status(500).send('添加数据失败');
                        }
                        console.log('添加数据成功');
                        return res.status(200).send('success');
                    })
            }
        })



    }
}

exports.update = (req, res) => {
    if (req.body.params) {
        var request = req.body.params
        var sql = 'select * from user where phone=?'
        console.log(request.phone);
        db.query(sql, request.phone, (err, data) => {
            console.log(data);
            if (data.length > 1) {
                return res.status(500).send('电话号码重复');
            }
            else {
                var sql = 'update user set name=?,phone=?,email=?,password=?,image=?,type=? where userId=?'
                db.query(sql, [request.name, request.phone, request.email, request.password, request.image, request.type, request.userId],
                    (err) => {
                        if (err) {
                            console.log(err.message);
                            return res.status(500).send('修改数据失败');
                        }
                        console.log('修改数据成功');
                        return res.status(200).send('success');
                    })
            }
        })
        // console.log(request);

        // console.log(request.name, request.phone, request.email,request.password,request.image,request.type,request.userId);
      
    }
}