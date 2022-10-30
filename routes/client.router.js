const client = require('../controller/clientController');
var router = require('express').Router();

router.post('/', client.create);
router.get('/:store_domain', client.getClientByDomain);

module.exports = router;