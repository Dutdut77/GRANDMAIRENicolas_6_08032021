const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const saucesCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');


router.post('/', auth, multer, saucesCtrl.addSauce);
router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, saucesCtrl.updateSauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
//router.post('/:id/like', saucesCtrl.likeSauce);

module.exports = router;