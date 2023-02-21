const authController = require('../controller/authController');
const validatePackage = require('../middleware/validatePackage');
const router = require('express').Router();

router.post('/login', validatePackage('userpass'), authController.login);
router.post('/signup', validatePackage('userpass'), authController.signup);
router.get('/refresh', validatePackage('token'), authController.refresh);
router.get('/logout', authController.logout);

module.exports = router;
