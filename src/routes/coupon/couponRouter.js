import express from 'express';
import { createCoupon, getAllCoupons, updateCoupon, checkout } from '../../controllers/coupon/couponController';
import { isSeller, isBuyer } from '../../middleware/role';
import isVendorEnabled from '../../middleware/enableUser';
import couponValidation from '../../middleware/couponValidator';
import validateVendor from '../../middleware/vendor/validateVendor';

const couponRouter = express.Router();
couponRouter.post('/create', isSeller, isVendorEnabled, validateVendor, couponValidation, createCoupon);
couponRouter.post('/sellerCoupons', isSeller, isVendorEnabled, validateVendor, getAllCoupons);
couponRouter.put('/update', isSeller, isVendorEnabled, validateVendor, updateCoupon);
couponRouter.post('/checkout', isBuyer, checkout);

export default couponRouter;
