const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/query1', controller.getQuery1);
router.get('/query2', controller.getQuery2);
router.get('/query3', controller.getQuery3);
router.get('/query4', controller.getQuery4);
router.get('/query5', controller.getQuery5);


module.exports = router;