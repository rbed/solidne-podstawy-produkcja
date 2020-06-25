var express = require("express");
var router = express.Router();
const standardScoreController = require('../../controllers/standardScoreController');


//   Users API info path
router.get('/', standardScoreController.getAll);
// router.get('/:id', standardScoreController.getByID);
router.post('/', standardScoreController.create);
router.post('/add-many', standardScoreController.addMany);
router.put('/', standardScoreController.update);
router.delete('/', standardScoreController.removeByID);


module.exports = router;
