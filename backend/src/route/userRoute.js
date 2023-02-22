const userController = require('../controller/userController');
const authorization = require('../middleware/authorization');
const router = require('express').Router();

router.get('/search', authorization('manager'), userController.search);
router.delete('/delete/:id', authorization('admin'), userController.delete);

module.exports = router;
