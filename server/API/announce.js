let db = require('../db/index')

exports.getAll = (req, res) => {
    var sql = 'select * from announcement'
    db.query(sql, (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}

exports.getDetail = (req, res) => {
    console.log(req.query.announceId);
    var sql = 'select * from announcement where announceId = ?'
    db.query(sql, req.query.announceId, (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}

exports.delete = (req, res) => {
    if (req.body.params) {
        var sql = 'delete from announcement where announceId=?'
        console.log(req.body.params.announceId);
        db.query(sql, req.body.params.announceId,
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
        var sql = 'insert into announcement (content,time,title,announceId) values(?,?,?,?)'
        db.query(sql, [request.content, request.time, request.title, request.announceId],
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
    console.log(req, '****');
    if (req.body.params) {
        var request = req.body.params
        var sql = 'update announcement set content=?,time=?,title=? where announceId=?'
        db.query(sql,[request.content, request.time, request.title, request.announceId],
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