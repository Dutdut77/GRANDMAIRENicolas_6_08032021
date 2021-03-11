const express = require('express');
const router = express.Router();
const hidden = require('../middleware/hidden');
const userCtrl = require('../controllers/user');


router.post('/signup', hidden, userCtrl.signup);
router.post('/login', hidden, userCtrl.login);


module.exports = router;