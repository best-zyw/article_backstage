var express = require('express');
var router = express.Router();
var  models = require('../models');

router.get('/:id', async function (req, res, next) {
    var category = await models.Category.findOne({
        where: {id: req.params.id},
    });
    res.json({  success: true,
        message: '获取成功',
        data: {category: category}});
});



module.exports = router;