import { vendors } from '../../database/models';

const validateVendor = async (req, res, next) => {
  const { vendorId } = req.body;
 console.log(vendorId, req.vendor);
  const vendor = await vendors.findOne({
    where: {
      id: vendorId,
      userId: req.vendor,
    },
  });

  if (!vendor) {
    return res.status(401).json({ status: 401, message: req.t('not_vendor') });
  }
  next();
};
export default validateVendor;
