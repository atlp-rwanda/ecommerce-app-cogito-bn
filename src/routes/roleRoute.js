import { Router } from 'express';
import RolesControlle from '../controllers/roleController.js';
import {
  isAdmin, isSeller, isBuyer, checkPermission,
} from '../middleware/role';

const Route = Router();

Route.post('/role', isAdmin, checkPermission('manage roles'), RolesControlle.createNewRole),
Route.get('/role', isAdmin, RolesControlle.getAllRoles),
Route.get('/role/:id', isAdmin, RolesControlle.getOneRole),
Route.put('/role/:id', isAdmin, RolesControlle.updateOneRole),
Route.delete('/role/:id', isAdmin, RolesControlle.deleteOneRole),
Route.post('/setrole', isAdmin, RolesControlle.setRole),
Route.get('/users/roles', isAdmin, RolesControlle.usersWithRoles),
Route.get('/users/roles/:id', isAdmin, RolesControlle.userWithRole),
Route.put('/users/roles/:id', isAdmin, RolesControlle.updateUserWithRole),
Route.delete('/users/roles/:id', isAdmin, RolesControlle.deleteUserWithRole);

export default Route;
