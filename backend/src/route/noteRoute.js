const noteController = require('../controller/noteController');
const router = require('express').Router();
const authorization = require('../middleware/authorization');

router.get('/', noteController.search);
router.put('/:id', noteController.update);
router.post('/', noteController.create);
router.delete('/:id', authorization('admin'), noteController.destroy);

module.exports = router;
