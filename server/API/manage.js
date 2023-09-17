let db = require('../db/index')

exports.get = (req, res) => {
    if (req.query.phone) {
        var sql = 'select * from manage where phone=?'
        console.log(req.query.phone);
        db.query(sql, req.query.phone, (err, data) => {
            if (err) {
                return res.send('错误：' + err.message)
            }
            res.send(data)
        })
    }
}