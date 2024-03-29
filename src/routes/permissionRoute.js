import { Router } from 'express';
import PermControlle from '../controllers/permissionController';
import {
  isAdmin,
} from '../middleware/role';

const Route = Router();

Route.post('/permission', isAdmin, PermControlle.createNewPermission);
Route.get('/permission', isAdmin, PermControlle.getAllPermission);
Route.get('/permission/:id', isAdmin, PermControlle.getOnePermission);
Route.put('/permission/:id', isAdmin, PermControlle.updateOnePermission);
Route.delete('/permission/:id', isAdmin, PermControlle.deleteOnePermission);
Route.post('/setpermission', isAdmin, PermControlle.setPermission);
Route.get('/roles/permissions', isAdmin, PermControlle.getRoleWithPermission);
Route.get('/roles/permissions/:id', isAdmin, PermControlle.getoneRoleWithPermission);
Route.put('/roles/permissions/:id', isAdmin, PermControlle.updateRoleWithPermission);
Route.delete('/roles/permissions/:id', isAdmin, PermControlle.deleteRoleWithPermission);

export default Route;
