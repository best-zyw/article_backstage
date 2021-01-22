var jwt = require('jsonwebtoken');

module.exports = function (options) {
    return function (req, res, next) {
        var token = req.headers.token;

        if (!token) {
            return res.status(401).send({
                success: false,
                message: '当前接口需要认证才能访问.'
            });
        }

        //验证token是否正确
        jwt.verify(token,'hdasdasd', function (err, decoded) {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'token过期，请重新登录'
                });
            }

            //解析出来的数据存入req
            req.user = decoded.user;
        })

        next();
    }
}

