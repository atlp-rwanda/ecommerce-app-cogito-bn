const { Sequelize } = require('sequelize');
const { Vendor } = require('.src/database/models');
const express = require('express')
const { sequelize, users} = require('./src/database/models')

const app = express()
app.use(express.json())
app.get('/', (req, res) => {
    res.status(200).send(`<h1>Welcome to ecommerce-app-cogito-bn </h1>`);
});

//Connect Postgress db

app.listen({ port: 4000  }, async () => {
    console.log('Server up on http://localhost:4000')
    await sequelize.authenticate()
    console.log('Database Connected!')
  })

  app.post('/register_vendor', async (req, res) => {
    const { fullName, email, phoneNumber, businessName, businessAddress, businessPhoneNumber, businessEmail, businessWebsite, businessDescription, businessLogo, productCategories, paymentMethods } = req.body;
  
    try {
      const vendor = await Vendor.create({
        fullName,
        email,
        phoneNumber,
        businessName,
        businessAddress,
        businessPhoneNumber,
        businessEmail,
        businessWebsite,
        businessDescription,
        businessLogo,
        productCategories,
        paymentMethods
      });
  
      res.status(201).json({ message: 'Vendor registered successfully', vendor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while registering the vendor' });
    }
  });