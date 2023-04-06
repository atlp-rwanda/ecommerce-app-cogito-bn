const nodemailer = require('nodemailer');
const { vendors } = require('../database/models');

const getAllVendors = async (req, res) => {
  try {
    const vendor = await vendors.findAll();
    res.status(200).json(vendor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

const registerVendor = async (req, res) => {
  try {
    const vendor = await vendors.create(req.body);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ndahayosibertin17@gmail.com',
        pass: 'aobjjmbjustvrpvm',
      },
    });
    const mailOptions = {
      from: 'ndahayosibertin17@gmail.com',
      to: vendor.email,
      subject: 'Welcome to Cogito',
      text: `Dear ${vendor.fullName},\n\nWelcome to Cogito! We are excited to have you as a new vendor. Your business information has been successfully saved in our system.\n\nHere is the information you provided:\n\nFull Name: ${vendor.fullName}\nBusiness Name: ${vendor.businessName}\nBusiness Address: ${vendor.businessAddress}\nBusiness Phone Number: ${vendor.businessPhoneNumber}\nBusiness Email: ${vendor.businessEmail}\nBusiness Website: ${vendor.businessWebsite}\nBusiness Description: ${vendor.businessDescription}\nProduct Categories: ${vendor.productCategories}\nPayment Methods: ${vendor.paymentMethods}\nRandom Password: ${vendor.password}, You can change this password only after login to our site.\n Login Here.\n\nThank you for choosing Cogito!\n\nBest regards,\nThe Cogito Team`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json('Error sending email');
      } else {
        console.log(`Email sent: ${info.response}`);
        res.status(201).json(vendor);
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
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
module.exports = {
  getAllVendors,
  registerVendor,
  findVendorByID,
  updateVendor,
  deleteVendor,
};
