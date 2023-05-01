import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { vendors } from '../../database/models';
import {
  validateVendorRegistration,
  validateVendorLogin,
} from '../../middleware/vendor/registerVendorValidator';
import vendorSignAccessToken from '../../middleware/vendor/vendorJWT';
import sendEmail from '../../middleware/vendor/vendorSendMail';

dotenv.config();
// all vendors endpoint are to be acccessed by only admin users.
// function to get all vendors registered in cogito ecommerce.
export const getAllVendors = async (req, res) => {
  try {
    const { authenticatedUser } = req;
    if (!authenticatedUser) {
      return res.status(403).json({
        status: 403,
        message: req.t('unauthorized_msg'),
      });
    }
    const vendor = await vendors.findAll();
    return res.status(200).json({
      status: 200,
      message: req.t('getAllVendors_200_msg'),
      response: vendor,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: req.t('getAllVendors_500_msg'),
      Error: error.message,
    });
  }
};
// function to register vendor in cogito ecommerce.
export const registerVendor = async (req, res) => {
  try {
    const { authenticatedUser } = req;
    if (!authenticatedUser) {
      return res.status(403).json({
        status: 403,
        message: req.t('unauthorized_msg'),
      });
    }
    const { error } = validateVendorRegistration(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: req.t('registerVendor_400_msg'),
        Error: error.details[0].message,
      });
    }
    const vendorEmail = await vendors.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (vendorEmail) {
      return res.status(409).json({ status: 409, message: req.t('registerVendor_409_msg') });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // function that sends welcome email to the newly registered vendors
    const recipientEmail = req.body.email;
    const emailSubject = 'Welcome to Cogito Ecommerce';
    const emailMessage = `Dear ${req.body.fullName},\n\nWelcome to Cogito! We are excited to have you as a new vendor. Your business information has been successfully saved in our system.\n\nHere is the information you provided:\n\nFull Name: ${req.body.fullName}\nBusiness Name: ${req.body.businessName}\nBusiness Address: ${req.body.businessAddress}\nBusiness Phone Number: ${req.body.businessPhoneNumber}\nBusiness Email: ${req.body.businessEmail}\nBusiness Website: ${req.body.businessWebsite}\nBusiness Description: ${req.body.businessDescription}\nProduct Categories: ${req.body.productCategories}\nPayment Methods: ${req.body.paymentMethods}\nRandom Password: ${req.body.password}, You can change this password only after login to our site.\n Login Here:\t http://localhost:9090/vendors/login \n\nThank you for choosing Cogito!\n\nBest regards,\nThe Cogito Team`;
    const emailResult = await sendEmail(recipientEmail, emailSubject, emailMessage);
    if (emailResult.success) {
      // Storing the vendors info only after the email was sent too the newly registered vendors.
      await vendors.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashedPassword,
        phoneNumber: req.body.phone,
        businessName: req.body.businessName,
        businessAddress: req.body.businessAddress,
        businessPhoneNumber: req.body.businessPhone,
        businessEmail: req.body.businessEmail,
        businessWebsite: req.body.businessWebsite,
        businessDescription: req.body.businessDescription,
        businessLogo: req.body.businessLogo,
        productCategories: req.body.productCategories,
        paymentMethods: req.body.paymentMethods,
        status: req.body.status,
      });
      return res.status(201).json({
        status: 201,
        message: req.t('registerVendor_201_msg'),
        response: req.body,
      });
    }
    return res.status(500).json({
      status: 500,
      message: req.t('registerVendor_500_001_msg'),
      Error: emailResult.error,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: req.t('registerVendor_500_002_msg'), Error: error });
  }
};
// function to get vendor by ID.
export const findVendorByID = async (req, res) => {
  try {
    const { authenticatedUser } = req;
    if (!authenticatedUser) {
      return res.status(403).json({
        status: 403,
        message: req.t('unauthorized_msg'),
      });
    }
    const vendor = await vendors.findByPk(req.params.id);
    if (vendor === null) {
      res
        .status(404)
        .json({ status: 404, message: `${req.t('findVendorByID_404_msg')} ${req.params.id}` });
    }
    return res.status(200).json({
      status: 200,
      message: `${req.t('findVendorByID_200_msg')} ${req.params.id} `,
      response: vendor,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `${req.t('findVendorByID_500_msg')} ${req.params.id}.`,
      Error: error.message,
    });
  }
};
// function to update vendor information.
export const updateVendor = async (req, res) => {
  try {
    const { authenticatedUser } = req;
    if (!authenticatedUser) {
      return res.status(403).json({
        status: 403,
        message: req.t('unauthorized_msg'),
      });
    }

    const vendor = await vendors.findByPk(req.params.id);

    await vendor.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (vendor === null) {
      res
        .status(404)
        .json({ status: 404, message: `${req.t('updateVendor_404_msg')} ${req.params.id} ` });
    }
    return res.status(200).json({
      status: 200,
      message: `${req.t('updateVendor_200_msg')} ${req.params.id}`,
      response: vendor,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `${req.t('updateVendor_500_msg')} ${req.params.id}`,
      Error: error.message,
    });
  }
};
// function to delete vendor by their ID.
export const deleteVendor = async (req, res) => {
  try {
    const { authenticatedUser } = req;
    if (!authenticatedUser) {
      return res.status(403).json({
        status: 403,
        message: req.t('unauthorized_msg'),
      });
    }
    const vendor = await vendors.findByPk(req.params.id);
    await vendors.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (vendor === null) {
      return res.status(404).json({ status: 404, message: req.t('deleteVendor_404_msg') });
    }
    return res.status(200).json({
      status: 200,
      message: `${req.t('deleteVendor_200_msg')} ${req.params.id}`,
      response: vendor,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: `${req.t('deleteVendor_500_msg')} ${req.params.id}`,
      Error: error.message,
    });
  }
};
// function to let vendors login with their provided email and password.
export const vendorLogin = async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  try {
    const { error } = validateVendorLogin(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: req.t('vendorLogin_400_msg'),
        Error: error.details[0].message,
      });
    }
    const vendor = await vendors.findOne({ where: { email } });
    if (!vendor) {
      return res.status(401).json({ status: 401, message: req.t('vendorLogin_401_001_msg') });
    }
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(401).json({ status: 401, message: req.t('vendorLogin_401_002_msg') });
    }
    const vendorLoginToken = await vendorSignAccessToken(vendor.id, vendor.fullName, vendor.status);
    res
      .cookie('token', vendorLoginToken, { httpOnly: true, secure: true })
      .status(200)
      .json({
        status: 200,
        message: `${vendor.fullName} ${req.t('vendorLogin_200_msg')}`,
        token: vendorLoginToken,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: req.t('vendorLogin_500_msg'), Error: error });
  }
};
