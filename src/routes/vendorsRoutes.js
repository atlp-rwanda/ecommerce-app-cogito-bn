const express = require('express');

const router = express.Router();
const {
  getAllVendors,
  registerVendor,
  findVendorByID,
  updateVendor,
  deleteVendor,
  vendorLogin,
} = require('../controllers/vendorsController');

router.get('/', getAllVendors);
router.post('/', registerVendor);
router.get('/:id', findVendorByID);
router.put('/:id', updateVendor);
router.delete('/:id', deleteVendor);
router.post('/login', vendorLogin);

module.exports = router;