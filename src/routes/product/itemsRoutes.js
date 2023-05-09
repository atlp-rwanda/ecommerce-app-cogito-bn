import { Router } from "express";
import {isSeller, isBuyer} from "../../middleware/role"
import getAllitemSeller from "../../controllers/product/itemController";
import getAllItemsAsBuyer from "../../controllers/product/itemController"

const productItem = Router();

productItem.get("/seller/items", isSeller, getAllitemSeller.getAllItems);
productItem.get("/buyer/items" ,isBuyer,getAllItemsAsBuyer.getAllItemsBuyer);

export default productItem;
