const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { vendors } = require('../../database/models');
const { validateVendorRegistration } = require('../../middleware/vendor/registerVendorValidator');
const { validateVendorLogin } = require('../../middleware/vendor/registerVendorValidator');
const { vendorSignAccessToken } = require('../../middleware/vendor/vendorJWT');

// eslint-disable-next-line consistent-return
const getAllVendors = async (req, res) => {
  try {
    const { authenticatedUser } = req;
    if (!authenticatedUser) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }
    const vendor = await vendors.findAll();
    res.status(200).json({
      success: true,
      message: 'Succesfully Retrieved all Vendors from the database.',
      response: vendor,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: 'Error in retrieving Vendor from the database',
      Error: error.message,
    });
  }
};

// eslint-disable-next-line consistent-return
const registerVendor = async (req, res) => {
  try {
    const { authenticatedUser } = req;
    if (!authenticatedUser) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }
    const { error } = validateVendorRegistration(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: 'Input Validation Error',
        Error: error.details[0].message,
      });
    }
    const vendorEmail = await vendors.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (vendorEmail) {
      return res
        .status(409)
        .json({ success: false, message: 'Vendor with this email already exists.' });
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
      return res.json({ message: 'Please enter all the details' });
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ndahayosibertin17@gmail.com',
        pass: 'aobjjmbjustvrpvm',
      },
    });
    const mailOptions = {
      from: 'ndahayosibertin17@gmail.com',
      to: newVendor.email,
      subject: 'Welcome to Cogito',
      text: `Dear ${newVendor.fullName},\n\nWelcome to Cogito! We are excited to have you as a new vendor. Your business information has been successfully saved in our system.\n\nHere is the information you provided:\n\nFull Name: ${newVendor.fullName}\nBusiness Name: ${newVendor.businessName}\nBusiness Address: ${newVendor.businessAddress}\nBusiness Phone Number: ${newVendor.businessPhoneNumber}\nBusiness Email: ${newVendor.businessEmail}\nBusiness Website: ${newVendor.businessWebsite}\nBusiness Description: ${newVendor.businessDescription}\nProduct Categories: ${newVendor.productCategories}\nPayment Methods: ${newVendor.paymentMethods}\nRandom Password: ${req.body.password}, You can change this password only after login to our site.\n Login Here.\n\nThank you for choosing Cogito!\n\nBest regards,\nThe Cogito Team`,
    };
    transporter.sendMail(mailOptions, (mailError, info) => {
      if (mailError) {
        console.log(mailError);
        res.status(500).json({
          success: false,
          message: 'Error sending email to the newly registerd vendor.',
          Error: mailError,
        });
      } else {
        console.log(`Email sent: ${info.response}`);
        res.status(201).json({
          success: true,
          message: 'Succesfully created a new Vendor.',
          response: newVendor,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to create a new Vendor.', Error: error });
  }
};

const findVendorByID = async (req, res) => {
  try {
    const { authenticatedUser } = req;
    if (!authenticatedUser) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }
    const vendor = await vendors.findByPk(req.params.id);
    if (vendor === null) {
      res
        .status(404)
        .json({ success: false, message: `Vendor with ID ${req.params.id} was not found` });
    }
    res.status(200).json({
      success: true,
      message: `Succesfully retrieved vendor with ID: ${req.params.id}.`,
      response: vendor,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `Failed to retrieve vendor with ID: ${req.params.id}.`,
      Error: error.message,
    });
  }
};

const updateVendor = async (req, res) => {
  try {
    const { authenticatedUser } = req;
    if (!authenticatedUser) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
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
        .json({ success: false, message: `Vendor with ID ${req.params.id} was not found` });
    }
    res.status(200).json({
      success: true,
      message: `Sucessfully Updated the Vendor with ID: ${req.params.id}`,
      response: vendor,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `Failed to Update the Vendor with ID: ${req.params.id}`,
      Error: error.message,
    });
  }
};

const deleteVendor = async (req, res) => {
  try {
    const { authenticatedUser } = req;
    if (!authenticatedUser) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }
    const vendor = await vendors.findByPk(req.params.id);
    await vendors.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (vendor === null) {
      res
        .status(404)
        .json({ success: false, message: `Vendor with ID ${req.params.id} was not found` });
    }
    res.status(200).json({
      success: true,
      message: `Sucessfully Deleted the Vendor with ID: ${req.params.id}`,
      response: vendor,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `Failed to Delete the Vendor with ID: ${req.params.id}`,
      Error: error.message,
    });
  }
};
// eslint-disable-next-line consistent-return
const vendorLogin = async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  try {
    const { error } = validateVendorLogin(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: 'Input Validation Error',
        Error: error.details[0].message,
      });
    }
    const vendor = await vendors.findOne({ where: { email } });
    if (!vendor) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email, First Register with Cogito Team' });
    }
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const vendorLoginToken = await vendorSignAccessToken(vendor.id, vendor.fullName, vendor.status);
    res
      .cookie('token', vendorLoginToken, { httpOnly: true, secure: true })
      .status(200)
      .json({
        success: true,
        message: `${vendor.fullName} You Have LoggedIn Successfully!!`,
        token: vendorLoginToken,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: 'Server error - Vendor Login Failed.', Error: error });
  }
};

module.exports = {
  getAllVendors,
  registerVendor,
  findVendorByID,
  updateVendor,
  deleteVendor,
  vendorLogin,
};
