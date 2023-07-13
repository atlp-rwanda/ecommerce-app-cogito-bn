import { Router } from 'express';
import { isSeller, isBuyer } from '../../middleware/role';
import { getAllItems, getAllItemsBuyer } from '../../controllers/product/itemController';

const productItem = Router();

productItem.get('/seller/items', isSeller, getAllItems);
productItem.get('/buyer/items', isBuyer, getAllItemsBuyer);

export default productItem;
