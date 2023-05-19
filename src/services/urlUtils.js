function getOrderStatusUrl(orderId) {
  // Assuming your website URL is stored in an environment variable
  const websiteUrl = process.env.WEBSITE_URL;

  // Assuming your order status route is "/orders/:orderId/status"
  const orderStatusRoute = `/orders/${orderId}/status`;

  // Construct the complete URL
  const orderStatusUrl = `${websiteUrl}${orderStatusRoute}`;

  return orderStatusUrl;
}

export default {
  getOrderStatusUrl,
};
