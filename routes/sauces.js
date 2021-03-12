const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const saucesCtrl = require('../controllers/sauces');



router.post('/', auth, saucesCtrl.addSauce);
router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, saucesCtrl.updateSauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
//router.post('/:id/like', saucesCtrl.likeSauce);

module.exports = router;