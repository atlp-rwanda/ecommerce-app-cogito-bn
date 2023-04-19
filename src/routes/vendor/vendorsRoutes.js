import express from 'express';
import vendorAuth from '../../middleware/vendor/vendorAuth';
import {
  getAllVendors,
  registerVendor,
  findVendorByID,
  updateVendor,
  deleteVendor,
  vendorLogin,
} from '../../controllers/vendor/vendorsController';

const router = express.Router();
router.get('/', vendorAuth, getAllVendors);
router.post('/', vendorAuth, registerVendor);
router.get('/:id', vendorAuth, findVendorByID);
router.put('/:id', vendorAuth, updateVendor);
router.delete('/:id', vendorAuth, deleteVendor);
router.post('/login', vendorLogin);

export default router;
