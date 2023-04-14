const express = require('express');

const router = express.Router();
const { getAllUsers, UserLogin, registerUsers } = require('../../controllers/user/userController');

router.get('/', getAllUsers);
router.post('/', registerUsers);

router.post('/login', UserLogin);

module.exports = router;
