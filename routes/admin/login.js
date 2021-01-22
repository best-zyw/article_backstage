var express = require('express');
var router = express.Router();
var models =require('../../models');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')

/* GET home page. */
router.post('/', async function(req, res, next) {
    let username = req.body.username
    let password = req.body.password
    let user = await models.User.findOne({
        where: {
            username: username
        }
    })
    if(!user){
        res.json({success: false, message: '用户名错误！'})
        return;
    }
    if (!bcrypt.compareSync(password, user.password)) {
        res.json({success: false, message: '密码错误！'})
        return;
    }
    var token = jwt.sign({
        user: {
            id: user.id,
            admin:true,
            username: username
        }
    },"hdasdasd", {expiresIn: 60 * 60 * 24 * 7});

    res.json({
        success: true,
        message: '请求成功',
        token: token
    })
});

module.exports = router;