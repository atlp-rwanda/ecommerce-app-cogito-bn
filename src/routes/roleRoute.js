/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
import { Router } from "express";
import RolesControlle from "../controllers/roleController";
import {
  isAdmin,
  isSeller,
  isBuyer,
  checkPermission,
} from "../middleware/role";

const Route = Router();

Route.post("/role", isAdmin, RolesControlle.createNewRole),
  Route.get("/role", isAdmin, RolesControlle.getAllRoles),
  Route.get("/role/:id", isAdmin, RolesControlle.getOneRole),
  Route.put("/role/:id", isAdmin, RolesControlle.updateOneRole),
  Route.delete("/role/:id", isAdmin, RolesControlle.deleteOneRole),
  Route.post("/setrole", isAdmin, RolesControlle.setRole);
export default Route;
