import { Router } from 'express';
import {
  isAdmin, isSeller, isBuyer, checkPermission,
} from '../middleware/role';
import passwordUpdate from '../controllers/passwordUpdateController'

const Route = Router();

Route.put('/updatepassword/:id', passwordUpdate.updatePassword);

export default Route;
