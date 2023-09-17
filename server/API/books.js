let db = require('../db/index')

exports.getAll = (req, res) => {
    var sql = 'select * from books limit 1, 10'
    db.query(sql, (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
    
}
exports.get = (req, res) => {
    if (req.query.nameid) {
        var sql = 'select * from books where concat(nameid,sort,`describe`,publisher,name,author) like ? '
        console.log(req.query.nameid)
        let params = `%${req.query.nameid}%`
        db.query(sql,[params] , (err, data) => {
            if (err) {
                return res.send('错误：' + err.message)
            }
            res.send(data)
        })
    }
}
exports.getBook = (req, res) => {
    if (req.query.nameid) {
        var sql = 'select * from books where nameid= ? '
        console.log(req.query.nameid)
        let params = req.query.nameid
        db.query(sql,[params] , (err, data) => {
            if (err) {
                return res.send('错误：' + err.message)
            }
            res.send(data)
        })
    }
}
exports.delete = (req, res) => {
    if (req.body.params) {
        var sql = 'delete  from books where nameid=?'
        console.log(req.body.params.nameid);
        db.query(sql, req.body.params.nameid,
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
        var sql = 'insert into books (name,author,sort,`describe`,publisher,url,nameid,stock) values(?,?,?,?,?,?,?,?)'
        db.query(sql, [request.name, request.author, request.sort, request.describe, request.publisher, request.url, request.nameid,request.stock],
            (err) => {
                if (err) {
                    console.log(err.message);
                    return res.status(500).send('添加数据失败');
                }
                console.log('添加数据成功');
                return res.status(200).send('success');
            })
    }
}

exports.update = (req, res) => {
    if (req.body.params) {
        var request = req.body.params
        // console.log(request);
        var sql = 'update books set name=?,author=?,sort=?,`describe`=?,publisher=?,url=?,stock=? where nameid=?'
        db.query(sql, [ request.name, request.author, request.sort, request.describe, request.publisher, request.url,request.stock, request.nameid],
            (err) => {
                if (err) {
                    console.log(err.message);
                    return res.status(500).send('修改数据失败');
                }
                console.log('修改数据成功');
                return res.status(200).send('success');
            })
    }
}