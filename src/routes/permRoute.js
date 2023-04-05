import { Router } from "express";
import PermControlle from "../controllers/permController";


const Route = Router();

Route.post('/permission', PermControlle.createNewPermission),
Route.get('/permission', PermControlle.getAllPermission),
Route.get('/permission/:id', PermControlle.getOnePermission),
Route.put('/permission/:id', PermControlle.updateOnePermission),
Route.delete('/permission/:id',PermControlle.deleteOnePermission),
Route.post('/setpermission',PermControlle.setPermission),
Route.get('/roles/permissions',PermControlle.getRoleWithPermission),
Route.get('/roles/permissions/:id',PermControlle.getoneRoleWithPermission),
Route.put('/roles/permissions/:id',PermControlle.updateRoleWithPermission),
Route.delete('/roles/permissions/:id',PermControlle.deleteRoleWithPermission)

export default Route;