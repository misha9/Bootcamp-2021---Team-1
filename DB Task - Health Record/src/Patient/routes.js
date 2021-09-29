const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getPatients);
router.post('/', controller.addPatient);
router.get('/:p_id', controller.getPatientById);

module.exports = router;