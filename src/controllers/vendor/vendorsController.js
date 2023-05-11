import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import { vendors, user } from '../../database/models';
import {
  validateVendorRegistration,
  validateVendorLogin,
} from '../../middleware/vendor/registerVendorValidator';
import vendorSignAccessToken from '../../middleware/vendor/vendorJWT';
import sendEmail from '../../middleware/vendor/vendorSendMail';
import vendorConfirmationEmail from '../../helpers/email';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(i18nextMiddleware.handle(i18next));
i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: '././src/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: 'en',
    preload: ['en', 'fr'],
  });
// all vendors endpoint are to be acccessed by only admin users.
// function to get all vendors registered in cogito ecommerce.
export const getAllVendors = async (req, res) => {
  try {
    const { authenticatedUser } = req;
    if (!authenticatedUser) {
      return res.status(403).json({
        success: false,
        message: req.t('unauthorized_msg'),
      });
    }
    const vendor = await vendors.findAll();
    res.status(200).json({
      success: true,
      message: req.t('getAllVendors_200_msg'),
      response: vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
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
        success: false,
        message: req.t('unauthorized_msg'),
      });
    }
    const { error } = validateVendorRegistration(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: req.t('registerVendor_400_msg'),
        Error: error.details[0].message,
      });
    }
    const vendorId = await vendors.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (vendorId) {
      return res.status(409).json({ success: false, message: req.t('registerVendor_409_msg') });
    }
    // function that sends welcome email to the newly registered vendors
    const User = await user.findOne({
      where: {
        id: req.body.userId,
      },
    });
    if (!User) {
      return res.status(401).json({
        status: 401,
        message: req.t('user_not_found'),
      });
    }
    const updatedUser = await user.update(
      {
        roleId: 2,
      },
      {
        where: {
          id: req.body.userId,
        },
        returning: true,
      },
    );

    const recipientEmail = User.dataValues.email;
    const emailSubject = 'Welcome to Cogito Ecommerce';
    const emailMessage = vendorConfirmationEmail(User.dataValues, req.body);
    const emailResult = await sendEmail(recipientEmail, emailSubject, emailMessage);
    if (emailResult.success) {
      // Storing the vendors info only after the email was sent too the newly registered vendors.
      const newVendor = await vendors.create({
        userId: req.body.userId,
        businessName: req.body.businessName,
        businessAddress: req.body.businessAddress,
        businessPhoneNumber: req.body.businessPhoneNumber,
        businessEmail: req.body.businessEmail,
        businessWebsite: req.body.businessWebsite,
        businessDescription: req.body.businessDescription,
        businessLogo: req.body.businessLogo,
        productCategories: req.body.productCategories,
        paymentMethods: req.body.paymentMethods,
        status: req.body.status,
      });

      res.status(201).json({
        success: true,
        message: req.t('registerVendor_201_msg'),
        user: updatedUser,
        response: newVendor,
      });
    } else {
      res.status(500).json({
        success: false,
        message: req.t('registerVendor_500_001_msg'),
        Error: emailResult.error,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: req.t('registerVendor_500_002_msg'), Error: error });
  }
};
// function to get vendor by ID.
export const findVendorByID = async (req, res) => {
  try {
    const { authenticatedUser } = req;
    if (!authenticatedUser) {
      return res.status(403).json({
        success: false,
        message: req.t('unauthorized_msg'),
      });
    }
    const vendor = await vendors.findByPk(req.params.id);
    if (vendor === null) {
      res
        .status(404)
        .json({ success: false, message: `${req.t('findVendorByID_404_msg')} ${req.params.id}` });
    }
    res.status(200).json({
      success: true,
      message: `${req.t('findVendorByID_200_msg')} ${req.params.id} `,
      response: vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
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
        success: false,
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
        .json({ success: false, message: `${req.t('updateVendor_404_msg')} ${req.params.id} ` });
    }
    res.status(200).json({
      success: true,
      message: `${req.t('updateVendor_200_msg')} ${req.params.id}`,
      response: vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
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
        success: false,
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
      res.status(404).json({ success: false, message: req.t('deleteVendor_404_msg') });
    }
    res.status(200).json({
      success: true,
      message: `${req.t('deleteVendor_200_msg')} ${req.params.id}`,
      response: vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
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
        success: false,
        message: req.t('vendorLogin_400_msg'),
        Error: error.details[0].message,
      });
    }
    const vendor = await vendors.findOne({ where: { email } });
    if (!vendor) {
      return res.status(401).json({ success: false, message: req.t('vendorLogin_401_001_msg') });
    }
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: req.t('vendorLogin_401_002_msg') });
    }
    const vendorLoginToken = await vendorSignAccessToken(vendor.id, vendor.fullName, vendor.status);
    res
      .cookie('token', vendorLoginToken, { httpOnly: true, secure: true })
      .status(200)
      .json({
        success: true,
        message: `${vendor.fullName} ${req.t('vendorLogin_200_msg')}`,
        token: vendorLoginToken,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: req.t('vendorLogin_500_msg'), Error: error });
  }
};
