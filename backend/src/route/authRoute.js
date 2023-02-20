const authController = require('../controller/authController');
const checkBody = require('../middleware/checkBody');
const router = require('express').Router();

router.post('/login', checkBody('userpass'), authController.login);
router.post('/signup', checkBody('userpass'), authController.signup);
router.post('/refresh', authController.resfreshToken);
router.post('/logout/:id', authController.logout);

module.exports = router;
