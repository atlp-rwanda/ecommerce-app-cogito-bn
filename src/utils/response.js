export default class Response {
    static successMessage(res, message, data = null, status) {
      return res
        .status(status)
        .json(
          data
            ? { status, result: data.length, message, data }
            : { status, message }
        );
    }
  
    static errorMessage(res, message, status) {
      return res.status(status).json({
        status,
        error: message,
      });
    }
  }
  