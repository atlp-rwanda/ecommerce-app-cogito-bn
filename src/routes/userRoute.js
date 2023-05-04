import { Router } from "express";
import UsersControlle from "../controllers/userController";
import { isAdmin, isSeller,isBuyer, checkPermission } from "../middleware/role";
import db from "../database/models/index.js";
import JwtUtility from "../utils/jwt";

const Route = Router();

Route.post('/user', isAdmin, checkPermission("manage users"), UsersControlle.createNewUser);
Route.get('/user', UsersControlle.getAllUser);
Route.get('/user/:id', UsersControlle.getOneUser);
Route.delete('/user/:id', UsersControlle.deleteOneUser);
Route.put('/user/:id', UsersControlle.updateOneUser);

export default Route;
