//导入数据库操作模块
const db = require('../db/index')
const bcrypt = require('bcryptjs')


//注册新用户的处理函数
exports.regUser = (req, res) => {
    //获取客户端提交到服务器的用户信息
    const userinfo = req.body
    //对表单中的数据进行合法性的校验
   /*  if (!userinfo.username || !userinfo.password) {
        return res.send({ status: 1, message: '用户名或密码不能为空！' })
    } */
    
    //定义SQL语句，查询用户名是否被占用
    const sql = `select * from ev_users where username=?`
    db.query(sql, [userinfo.username], function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            //return res.send({ status: 1, message: err.message })
            return res.cc(err)
        }
        // 用户名被占用
        if (results.length > 0) {
            //return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        // 调用bcrypt.hashSync()对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        //console.log(userinfo)
        //定义插入新用户的SQL语句
        const sql = 'insert into ev_users set ?'
        //调用db.query()执行SQL语句
        db.query(sql, { username: userinfo.username, password: userinfo.password }, function (err, results) {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)
            //return res.send({ status: 1, message: err.message })
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.cc('注册用户失败，请稍后再试！')
                //return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
            }
            // 注册成功
            //res.send({ status: 0, message: '注册成功！' })
            res.cc('注册成功', 0)
        })

    })


    //res.send('reguser OK')
}
//登录的处理函数
exports.login = (req, res) => {
    res.send('login OK')
}