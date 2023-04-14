const express = require('express');
const vendorAuth = require('../../middleware/vendor/vendorAuth');

const router = express.Router();
const {
  getAllVendors,
  registerVendor,
  findVendorByID,
  updateVendor,
  deleteVendor,
  vendorLogin,
} = require('../../controllers/vendor/vendorsController');

router.get('/', getAllVendors);
router.post('/', registerVendor);
router.get('/:id', findVendorByID);
router.put('/:id', vendorAuth, updateVendor);
router.delete('/:id', vendorAuth, deleteVendor);
router.post('/login', vendorLogin);

module.exports = router;
