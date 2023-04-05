const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { vendors } = require('../database/models');
const { validateVendorRegistration } = require('../middleware/vendor/registerVendorValidator');
const { validateVendorLogin } = require('../middleware/vendor/registerVendorValidator');
const { vendorSignAccessToken } = require('../middleware/vendor/registerVendorValidator');

const getAllVendors = async (req, res) => {
  try {
    const vendor = await vendors.findAll();
    res.status(200).json(vendor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

// eslint-disable-next-line consistent-return
const registerVendor = async (req, res) => {
  try {
    const { error } = validateVendorRegistration(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ message: error.details[0].message });
    }
    const vendorEmail = await vendors.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (vendorEmail) {
      return res.status(409).json({ message: 'Vendor with this email already exists' });
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
        res.status(500).json('Error sending email');
      } else {
        console.log(`Email sent: ${info.response}`);
        res.status(201).json(newVendor);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findVendorByID = async (req, res) => {
  try {
    const vendor = await vendors.findByPk(req.params.id);
    res.status(200).json(vendor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

const updateVendor = async (req, res) => {
  try {
    const vendor = await vendors.findByPk(req.params.id);
    await vendor.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(vendor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

const deleteVendor = async (req, res) => {
  try {
    const vendor = await vendors.findByPk(req.params.id);
    await vendors.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(vendor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
const vendorLogin = async (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  try {
    const { error } = validateVendorLogin(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ message: error.details[0].message });
    }
    const vendor = await vendors.findOne({ where: { email } });
    if (!vendor) {
      return res.status(401).json({ message: 'Invalid email' });
    }
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const vendorLoginToken = await vendorSignAccessToken(
      vendor.id,
      vendor.fullName,
      vendor.email,
      vendor.status,
    );
    res.status(200).json({ vendorLoginToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
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
