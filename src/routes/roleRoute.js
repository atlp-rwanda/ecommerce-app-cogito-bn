import { Router } from "express";
 import RolesControlle from "../controllers/roleController.js";


const Route = Router();

Route.post('/role', RolesControlle.createNewRole),
Route.get('/role', RolesControlle.getAllRoles),
Route.get('/role/:id', RolesControlle.getOneRole),
Route.put('/role/:id', RolesControlle.updateOneRole),
Route.delete('/role/:id', RolesControlle.deleteOneRole),
Route.post('/setrole', RolesControlle.setRole),
Route.get('/users/Roles', RolesControlle.usersWithRoles),
Route.get('/users/Roles/:id', RolesControlle.userWithRole),
Route.put('/users/Roles/:id', RolesControlle.updateUserWithRole),
Route.delete('/users/Roles/:id', RolesControlle.deleteUserWithRole)

export default Route;