let db = require('../db/index')

exports.getAll = (req, res) => {
    var sql = 'select * from borrow'
    db.query(sql, (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
    
}
exports.get = (req, res) => {
    if (req.query.nameid) {
        var sql = 'select * from borrow where nameid=? or userId=?'
        console.log(req.query.nameid);
        db.query(sql, [req.query.nameid,req.query.nameid], (err, data) => {
            if (err) {
                return res.send('错误：' + err.message)
            }
            res.send(data)
        })
    }
}
exports.getSelected = (req, res) => {
    if (req.query.nameid) {
        var sql = 'select * from borrow where concat(nameid,userId,borrowers,bookname,borrowtime,reallyrepaytime,repaytime) like ?'
        console.log(req.query.nameid);
        db.query(sql, `%${req.query.nameid}%`, (err, data) => {
            if (err) {
                return res.send('错误：' + err.message)
            }
            res.send(data)
        })
    }
}

exports.delete = (req, res) => {
    if (req.body.params) {
        var sql = 'delete  from borrow where borrowId=?'
        console.log(req.body.params.borrowId);
        db.query(sql, req.body.params.borrowId,
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
        var sql = 'insert into borrow (bookname,borrowtime,reallyrepaytime,repaytime,borrowers,userId,nameid,borrowId) values(?,?,?,?,?,?,?,?)'
        db.query(sql, [request.bookname, request.borrowtime, request.reallyrepaytime, request.repaytime, request.borrowers, request.userId, request.nameid,request.borrowId],
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
        console.log(request);
        var sql = 'update borrow set bookname=?,borrowtime=?,reallyrepaytime=?,repaytime=?,borrowers=?,userId=?,nameid=? where borrowId=?'
        db.query(sql, [request.bookname, request.borrowtime, request.reallyrepaytime, request.repaytime, request.borrowers, request.userId, request.nameid,request.borrowId],
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