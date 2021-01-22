var express = require('express');
var router = express.Router();
var models = require('../../models');




router.get('/', async function (req, res, next) {
    var category = await models.Category.findAndCountAll({
        order: [['sort', 'ASC']],
        where:{parentId:0},
        include: {model:models.Category,
            as:'children'
        },
    });
    res.json({success: true,data:{
        category: category,
    }});
});

router.post('/', async function (req, res, next) {
    let success=true
    let msg={}
    if(!req.body.name){
        msg.name="分类名必须填写"
        success=false
    }
    if(!req.body.sort){
        msg.sort="排序必须填写"
        success=false
    }
    if(!req.body.type){
        msg.type="类型必须填写"
        success=false
    }
    if(!success){
        return res.json({
            success: success,
            msg: msg
        });
    }
    var category = await models.Category.create(req.body)
    res.json({  success: true,
        message: '发布成功',
        data: {category: category}});
});
//新增
router.get('/:id', async function (req, res, next) {
    var category = await models.Category.findOne({
        where: {id: req.params.id},
    });
    res.json({  success: true,
        message: '获取成功',
        data: {category: category}});
});
//读单条
router.put('/:id', async function (req, res, next) {
    let success=true
    let msg={}
    if(!req.body.name){
        msg.name="分类必须填写"
        success=false
    }
    if(!req.body.sort){
        msg.sort="排序必须填写"
        success=false
    }
    if(!success){
        return res.json({
            success: success,
            msg: msg
        });
    }
    var category = await models.Category.findByPk(req.params.id);
    category.update(req.body);
    res.json({success: true,data:{
            category: category,
        }});
});
//修改
router.delete('/:id', async function (req, res, next) {
    var category = await models.Category.findByPk(req.params.id);
    var articles= await models.Article.findAll({
        where: {categoryId: req.params.id}
    })
    if(articles.length>0){
        return res.json({
            success: 'false',
            msg: '请先删除文章'
        });
    }
    category.destroy();
    res.json({success: true,data:{
            category: category,
        }});
});
//删除

module.exports = router;

