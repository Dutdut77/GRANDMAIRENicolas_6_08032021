const express = require('express');
const router = express.Router();

const sopekockoCtrl = require('../controllers/sopekocko');

router.post('/auth/signup', sopekockoCtrl.signupUser);
router.get('/auth/login', sopekockoCtrl.loginUser);



module.exports = router;