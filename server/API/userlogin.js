let db = require('../db/index')

exports.get = (req, res) => {
  console.log(req);
  // console.log(req.query.name, req.query.password,req.query.type);
  var sql = 'select * from user where phone=? and password=? and type=?';
  db.query(sql, [req.query.phone, req.query.password, req.query.type], (err, data) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('服务器错误');
    }
    if (data.length === 0) {
      return res.status(400).send('账号密码错误');
    }
    console.log('登录成功');
    return res.status(200).send('登录成功');
  });
}