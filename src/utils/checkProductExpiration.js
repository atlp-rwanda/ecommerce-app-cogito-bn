import EventEmitter from 'events';
import sendEmail from './sendEmail';
import { product, vendors } from '../database/models';

const cron = require('node-cron');

const testingEnvironment = process.env.NODE_ENV === 'test';
const developmentEnvironment = process.env.NODE_ENV === 'development';

const emitter = new EventEmitter();
// Expired Product Email Notification Sending
emitter.on('FoundExpiredProduct', (products) => {
  const vendorIDs = [];
  products.forEach(async (producta) => {
    const vendorID = producta.dataValues.vendor_id;
    const VendorInfo = await vendors.findOne({
      where: {
        userId: vendorID,
      },
      attributes: ['businessName', 'businessEmail'],
      raw: true,
    });
    const productName = producta.dataValues.name;
    const productID = producta.dataValues.id;
    const productRemained = producta.dataValues.quantity;
    const productExpirationDate = producta.dataValues.expiredAt;
    const productPrice = producta.dataValues.price;
    const EstimatedLoss = productPrice * productRemained;
    const recipientBusinessName = VendorInfo.businessName;
    const recipientEmail = VendorInfo.businessEmail;
    const emailSubject = 'Expired Product Notification';
    const emailMessage = `Dear ${recipientBusinessName},\n\nThrough our regular checkup, we would like to tell you that following products have been expired.\n\n\tProduct ID: ${productID}\n\n\tProduct Name: ${productName}\n\n\tProduct Was Expired On: ${productExpirationDate}\n\n\tEstimated Damaged Product: ${productRemained}\n\n\tProduct Price on one Item: ${productPrice}\n\n\tEstimated Loss: ${EstimatedLoss} \n\n\nYou can Login Here for follow up:\t http://localhost:9090/vendors/login \n\nThank you for choosing Cogito!\n\nBest regards,\nThe Cogito Team`;

    await sendEmail(recipientEmail, emailSubject, emailMessage);
    vendorIDs.push(vendorID);
  });
});
// Product Out of Stock Email Notification
emitter.on('ProductOutOfStock', (products) => {
  const vendorIDs = [];
  products.forEach(async (producta) => {
    const vendorID = producta.dataValues.vendor_id;
    const VendorInfo = await vendors.findOne({
      where: {
        userId: vendorID,
      },
      attributes: ['businessName', 'businessEmail'],
      raw: true,
    });
    const productID = producta.dataValues.id;
    const productName = producta.dataValues.name;
    const recipientBusinessName = VendorInfo.businessName;
    const recipientEmail = VendorInfo.businessEmail;
    const emailSubject = 'Product Out of Stock Notification';
    const emailMessage = `Dear ${recipientBusinessName},\n\nThrough our regular checkup, we would like to tell you that following products have run out of stock.\n\n\tProduct ID: ${productID}\n\n\tProduct Name: ${productName}.\n\nYou can Login Here for follow up: http://localhost:9090/vendors/login \n\nThank you for choosing Cogito!\n\nBest regards,\nThe Cogito Team`;
    await sendEmail(recipientEmail, emailSubject, emailMessage);
    vendorIDs.push(vendorID);
  });
});
const checkProductExpiration = (products) => {
  const currentDate = new Date();
  // Filter out products that have expired
  const validProducts = products.filter((AllProduct) => AllProduct.expiredAt > currentDate);
  return validProducts;
};
const checkExpiredProducts = (products) => {
  const currentDate = new Date();
  const expiredProducts = products.filter((AllProduct) => AllProduct.expiredAt < currentDate);
  return expiredProducts;
};
// Retrieving all the products whose quantity is less than 1
const checkProductQuantity = (products) => {
  const ProductQuantity = products.filter((AllProduct) => AllProduct.quantity < 1);
  return ProductQuantity;
};
async function checkAvailableProducts() {
  const RetrieveAllProducts = await product.findAll({
    where: {
      stock: 'In Stock',
    },
    Raw: true,
  });
  const RetrievedProducts = Object.values(RetrieveAllProducts);
  const productsExpired = checkExpiredProducts(RetrievedProducts);
  const ZeroQuantityProduct = checkProductQuantity(RetrieveAllProducts);
  if (!(productsExpired.length === 0)) {
    const count = productsExpired.length;
    console.log('You Have ', count, ' Expired Products and the products are listed below');
    emitter.emit('FoundExpiredProduct', productsExpired);
  }
  if (!(ZeroQuantityProduct.length === 0)) {
    const count = ZeroQuantityProduct.length;
    console.log('You Have ', count, ' Runned out of stock');
    emitter.emit('ProductOutOfStock', ZeroQuantityProduct);
  }
}
// Set up cron job to run once at the running time on the current date in the testing environment
// Cron job to run once at the running time on the current date in the development environment
if (testingEnvironment) {
  const currentDate = new Date();
  let currentSecond = currentDate.getSeconds() + 5;
  let currentMinute = currentDate.getMinutes();
  const currentHour = currentDate.getHours();
  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
  const options = { weekday: 'long' };
  const currentWeekday = currentDate.toLocaleDateString('en-US', options);
  // simple logic to eliminate the current seconds issue
  // in case the current seconds = 60 +5
  if (currentSecond > 60) {
    currentSecond = 10;
    currentMinute += 1;
  }
  const cronPattern = `${currentSecond} ${currentMinute} ${currentHour} ${currentDayOfMonth} ${currentMonth} ${currentWeekday}`;

  cron.schedule(cronPattern, () => {
    checkAvailableProducts();
  });
} else {
  // Set up cron job to run every midnight (00:00)
  // In production environment
  cron.schedule(' 0 0 * * *', () => {
    checkAvailableProducts();
  });
}
export default checkProductExpiration;
