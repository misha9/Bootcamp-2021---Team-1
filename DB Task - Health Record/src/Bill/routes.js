const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getBills);
router.post('/', controller.addBill);

module.exports = router;