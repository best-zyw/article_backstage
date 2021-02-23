var express = require('express');
var router = express.Router();
var  models = require('../models');

/* 首页接口. */
router.get('/', async function (req, res, next) {
  var category = await models.Category.findAll({
      order: [['sort', 'ASC']],
      where:[{parentId:0},{show:1}],
      include: {
        model:models.Category,
          as:'children',
          where:{show:1},
          order: [['sort', 'ASC']],
          limit:10000
      },
  });
  var Fees=await models.Category.findByPk(9);
  var News=await models.Article.findAll({
    where:{categoryId :13},
    order: [['id', 'desc']],
    limit:3
  });
  var Technology=await models.Article.findAll({
    where:{categoryId :14},
    order: [['id', 'desc']],
    limit:5
  });
  var Equipment=await models.Article.findAll({
    where:{categoryId :[15,16]},
    order: [['id', 'desc']],
    limit:8
  });
  res.json({success: true,data:{
      category,
      Fees,
      News,
      Technology,
      Equipment
  }});
});

module.exports = router;
