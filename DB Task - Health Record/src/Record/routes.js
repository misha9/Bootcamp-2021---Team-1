const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getRecords);
router.post('/', controller.addRecord);


module.exports = router;