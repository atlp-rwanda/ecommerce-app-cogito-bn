import { Router } from "express";
import RolesControlle from "../controllers/roleController.js";
import { isAdmin, isSeller,isBuyer, checkPermission } from "../middleware/role";


const Route = Router();

Route.post('/role', isAdmin, RolesControlle.createNewRole),
Route.get('/role', isBuyer, RolesControlle.getAllRoles),
Route.get('/role/:id', RolesControlle.getOneRole),
Route.put('/role/:id', RolesControlle.updateOneRole),
Route.delete('/role/:id', RolesControlle.deleteOneRole),
Route.post('/setrole', RolesControlle.setRole),
Route.get('/users/roles', RolesControlle.usersWithRoles),
Route.get('/users/roles/:id', RolesControlle.userWithRole),
Route.put('/users/roles/:id', RolesControlle.updateUserWithRole),
Route.delete('/users/roles/:id', RolesControlle.deleteUserWithRole)

export default Route;