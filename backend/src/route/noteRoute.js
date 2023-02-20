const router = require('express').Router();
const noteController = require('../controller/noteController');

router.get('/search', noteController.search);
router.post('/create', noteController.create);
router.post('/save/:id', noteController.save);

module.exports = router;
