import express from 'express';
import { getAllUsers, UserLogin, registerUsers } from '../../controllers/user/userController';

const router = express.Router();
router.get('/', getAllUsers);
router.post('/', registerUsers);
router.post('/login', UserLogin);

export default router;
