const noteController = require('../controller/noteController');
const router = require('express').Router();

router.get('/', noteController.search);
router.put('/:id', noteController.update);
router.post('/', noteController.create);
router.delete('/:id', noteController.destroy);

module.exports = router;
