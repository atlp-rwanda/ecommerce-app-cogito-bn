import { createLogger, format, transports } from 'winston';

const customFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.printf(
    ({ level, message, timestamp }) => `${timestamp} [${level.toUpperCase()}]: ${message}`,
  ),
);

const cartLogger = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({
      filename: 'Logs/cart.logs',
      format: customFormat,
    }),
  ],
});

module.exports = {
  cartLogger,
};
