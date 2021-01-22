var express = require('express');
var router = express.Router();
var models = require('../../models');
var bcrypt = require('bcryptjs');




router.get('/', async function (req, res, next) {
  // 搜索
  var where = {};
  var currentPage = parseInt(req.query.currentPage) || 1;
  var pageSize = parseInt(req.query.pageSize) || 8;
  var result = await models.User.findAndCountAll({
    order: [['id', 'DESC']],
    offset: (currentPage - 1) * pageSize,
    limit: pageSize
  });
  res.json({ success: true,data:{
    User: result.rows,
    pagination: {
      currentPage: currentPage,
      pageSize: pageSize,

      // 一共有多少条记录
      total: result.count}
  }});
});

router.post('/', async function (req, res, next) {
  let username = req.body.username
  let password = req.body.password
let findUser = await models.User.findOne({
  where: {username: username}
})

  if(findUser){
    return res.json({
      success: false,
      message: '用户名已注册！'
    });
  }

  password = bcrypt.hashSync(password, 8);
  
  let user = await models.User.create({
    username: username,
    password: password,
    admin: true
})

  res.json({  success: true,
    message: '请求成功',
    user: {
      id: user.id,
      name: user.username
  }});
});
//新增
router.get('/:id', async function (req, res, next) {
  var user = await models.User.findOne({
    where: {id: req.params.id},
  });
  res.json({success: true,data:{user: user}});
});
//读单条
router.put('/:id', async function (req, res, next) {
  let success=true
  let msg={}
  if(!req.body.username){
    msg.username="用户名必须填写"
    success=false
  }
  if(!req.body.password){
    msg.password="密码必须填写"
    success=false
  }
  if(!success){
    return res.json({
      success: success,
      msg: msg
    });
  }
  var user = await models.User.findByPk(req.params.id);
  user.update(req.body);
  res.json({success: true,data:{user: user}});
});
//修改
router.delete('/:id', async function (req, res, next) {
  var article = await models.User.findByPk(req.params.id);
  article.destroy();
  res.json({msg: '删除成功'});
});
//删除

module.exports = router;

