const userController = require('../controller/userController');
const verifyToken = require('../middleware/verifyToken');
const router = require('express').Router();

router.get('/search', userController.search);
router.delete('/delete/:id', verifyToken, userController.delete);

module.exports = router;
