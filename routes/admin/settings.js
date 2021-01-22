var express = require('express');
var router = express.Router();
var models = require('../../models');





router.get('/', async function (req, res, next) {
    var setting = await models.Setting.findByPk(1);
    res.json({success: true,data:{setting: setting}});
});
//读单条
router.put('/', async function (req, res, next) {
    let success=true
    let msg={}
    if(!req.body.siteName){
        msg.siteName="站点名必须填写"
        success=false
    }
    if(!req.body.copyright){
        msg.copyright="备案号必须填写"
        success=false
    }
    if(!success){
        return res.json({
            success: success,
            msg: msg
        });
    }
    var setting = await models.Setting.findByPk(1);
    setting.update(req.body);
    res.json({success: true,data:{setting: setting}});
});
//修改


module.exports = router;

