import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import { vendors } from '../../database/models';
import {
  validateVendorRegistration,
  validateVendorLogin,
} from '../../middleware/vendor/registerVendorValidator';
import { vendorSignAccessToken } from '../../middleware/vendor/vendorJWT';

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
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: req.t('getAllVendors_500_msg'),
      Error: error.message,
    });
  }
};

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
      console.log(error);
      return res.status(400).json({
        success: false,
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
      return res.status(409).json({ success: false, message: req.t('registerVendor_409_msg') });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newVendor = await vendors.create({
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
    if (
      !req.body.fullName
      || !req.body.email
      || !req.body.password
      || !req.body.phoneNumber
      || !req.body.businessName
      || !req.body.businessAddress
      || !req.body.businessPhoneNumber
      || !req.body.businessEmail
      || !req.body.businessWebsite
      || !req.body.businessDescription
      || !req.body.businessLogo
      || !req.body.productCategories
      || !req.body.paymentMethods
      || !req.body.status
    ) {
      return res.json({ message: req.t('registerVendor_validation_001_msg') });
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: newVendor.email,
      subject: 'Welcome to Cogito',
      text: `Dear ${newVendor.fullName},\n\nWelcome to Cogito! We are excited to have you as a new vendor. Your business information has been successfully saved in our system.\n\nHere is the information you provided:\n\nFull Name: ${newVendor.fullName}\nBusiness Name: ${newVendor.businessName}\nBusiness Address: ${newVendor.businessAddress}\nBusiness Phone Number: ${newVendor.businessPhoneNumber}\nBusiness Email: ${newVendor.businessEmail}\nBusiness Website: ${newVendor.businessWebsite}\nBusiness Description: ${newVendor.businessDescription}\nProduct Categories: ${newVendor.productCategories}\nPayment Methods: ${newVendor.paymentMethods}\nRandom Password: ${req.body.password}, You can change this password only after login to our site.\n Login Here:\t http://localhost:9090/vendors/login \n\nThank you for choosing Cogito!\n\nBest regards,\nThe Cogito Team`,
    };
    transporter.sendMail(mailOptions, (mailError, info) => {
      if (mailError) {
        console.log(mailError);
        res.status(500).json({
          success: false,
          message: req.t('registerVendor_500_001_msg'),
          Error: mailError,
        });
      } else {
        console.log(`Email sent: ${info.response}`);
        res.status(201).json({
          success: true,
          message: req.t('registerVendor_201_msg'),
          response: newVendor,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: req.t('registerVendor_500_002_msg'), Error: error });
  }
};

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
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `${req.t('findVendorByID_500_msg')} ${req.params.id}.`,
      Error: error.message,
    });
  }
};

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
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `${req.t('updateVendor_500_msg')} ${req.params.id}`,
      Error: error.message,
    });
  }
};

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
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `${req.t('deleteVendor_500_msg')} ${req.params.id}`,
      Error: error.message,
    });
  }
};

export const vendorLogin = async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  try {
    const { error } = validateVendorLogin(req.body);
    if (error) {
      console.log(error);
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
    console.log(error);
    res.status(500).json({ success: false, message: req.t('vendorLogin_500_msg'), Error: error });
  }
};
