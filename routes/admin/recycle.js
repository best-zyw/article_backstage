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
    where.deleted = 1
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
router.delete('/:id', async function (req, res, next) {
    var article = await models.Article.findByPk(req.params.id);
    article.destroy();
    res.json({msg: '删除成功'});
});
router.delete('/', async function (req, res, next) {
    await models.Article.destroy({
        where: {deleted: 1}
    });
    res.json({msg: '删除成功'});
});
router.post('/:id', async function (req, res, next) {
    var article = await models.Article.findByPk(req.params.id);
    await article.update({deleted:'0'})
    res.json({msg: '还原成功'});
});

module.exports = router;

