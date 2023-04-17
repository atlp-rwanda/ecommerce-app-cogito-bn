class Response {
  static successMessage(res, message, status) {
    console.log(`Sending success response with status ${status}: ${message}`);
    return res.status(status).json({
      message,
      status,
    });
  }

  static errorMessage(res, message, status) {
    console.log(`Sending error response with status ${status}: ${message}`);
    return res.status(status).json({
      message,
      status,
    });
  }
}

export default Response;