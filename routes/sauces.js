const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/sauces');


/* Route pour ajouter une sauce */
router.post('/', auth, multer, saucesCtrl.addSauce);

/* Route pour récupérer toutes les sauces */
router.get('/', auth, saucesCtrl.getAllSauces);

/* Route pour récupérer une sauce déterminée */
router.get('/:id', auth, saucesCtrl.getOneSauce);

/* Route pour modifier une sauce déterminée */
router.put('/:id', auth, saucesCtrl.updateSauce);

/* Route pour supprimée une sauce déterminée*/
router.delete('/:id', auth, saucesCtrl.deleteSauce);

/* Route pour liker ou disliker une sauce */
router.post('/:id/like', saucesCtrl.likeSauce);

module.exports = router;