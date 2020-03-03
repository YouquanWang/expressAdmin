const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const path = require('path');

let myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});
let logger = createLogger({
  level: 'error',
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new (transports.Console)(),
    new (transports.File)({
      filename: path.join(__dirname, '../log/error.log')
    })
  ]
});

module.exports = logger;