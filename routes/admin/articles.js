var express = require('express');
var router = express.Router();
var models = require('../../models');
var Op = models.Sequelize.Op;



router.get('/', async function (req, res, next) {
    // 搜索
    var where = {};
    var current_page = parseInt(req.query.current_page) || 1;
    var pageSize = parseInt(req.query.pageSize) ||6;

    // 模糊查询标题
    var title = req.query.title;
    var categoryId = req.query.categoryId;
    if (title) {
        where.title = {
            [Op.like]: '%' + title + '%'
        }
    }
    if (categoryId) {
        where.categoryId = categoryId
    }
    where.deleted = 0
    var result = await models.Article.findAndCountAll({
        order: [['id', 'DESC']],
        where: where,
        include: [models.Category],
        offset: (current_page - 1) * pageSize,
        limit: pageSize
    });
    res.json({ success: true,data:{
        articles: result.rows,
        pagination: {
            current_page: current_page,
            pageSize: pageSize,

            // 一共有多少条记录
            total: result.count}
    }});
});

router.post('/', async function (req, res, next) {
    let success=true
    let msg={}
    if(!req.body.categoryId){
        msg.categoryId="分类id必须填写"
        success=false
    }
    if(!req.body.content){
        msg.content="内容必须填写"
        success=false
    }
    if(!req.body.title){
        msg.title="标题必须填写"
        success=false
    }
    if(!success){
        return res.json({
            success: success,
            msg: msg
        });
    }
    var article = await models.Article.create(req.body)
    res.json({  success: true,
        message: '发布成功',
        data: {article: article}});
});
//新增
router.get('/:id', async function (req, res, next) {
    var article = await models.Article.findOne({
        where: {id: req.params.id},
    });
    res.json({ success: true,data:{article: article}});
});
//读单条
router.put('/:id', async function (req, res, next) {
    let success=true
    let msg={}
    if(!req.body.categoryId){
        msg.categoryId="分类id必须填写"
        success=false
    }
    if(!req.body.content){
        msg.content="内容必须填写"
        success=false
    }
    if(!req.body.title){
        msg.title="标题必须填写"
        success=false
    }
    if(!success){
        return res.json({
            success: success,
            msg: msg
        });
    }
    var article = await models.Article.findByPk(req.params.id);
    article.update(req.body);
    res.json({ success: true,data:{article: article}});
});
//修改
router.delete('/:id', async function (req, res, next) {
    var article = await models.Article.findByPk(req.params.id);
    await article.update({deleted:'1'})
    res.json({msg: '放入回收站成功'});
});
//删除

router.get('/recycle', async function (req, res, next) {
    // 搜索
    var where = {deleted : "1"};
    var result = await models.Article.findAll({
        order: [['id', 'DESC']],
        where: where,
        include: [models.Category],
    });
    res.json({ success: true,data:{
        recycle: result,
    }});
});
router.delete('/recycle/:id', async function (req, res, next) {
    var article = await models.Article.findByPk(req.params.id);
    article.destroy();
    res.json({msg: '删除成功'});
});

module.exports = router;

