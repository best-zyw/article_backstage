var express = require('express');
var router = express.Router();
var qiniu = require('qiniu')

/* GET home page. */
router.get('/', function(req, res, next) {
    var accessKey = 'USsFn5LITOFjLBJnqu0Ouj1X2gDDGo8YgPgNWxFU';
    var secretKey = '39yaw6dv3shR5eVBwtMCE7eSnbXNhmuvF4_agnU7';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var options = {
        scope: "zyw-cms",
      };
      var putPolicy = new qiniu.rs.PutPolicy(options);
      var uploadToken=putPolicy.uploadToken(mac);
      res.json({uploadToken:uploadToken})
});

module.exports = router;
