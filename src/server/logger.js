import { createLogger, transports, format } from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, colorize, printf } = format;

const consoleFormat = printf(info => `${info.timestamp} - ${info.level}: ${info.message}`);

export default name =>
  createLogger({
    level: 'info',
    format: combine(timestamp(), consoleFormat),
    timestamp: true,
    transports: [
      new transports.Console({
        format: combine(timestamp(), colorize(), consoleFormat),
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
      }),
      new transports.DailyRotateFile({
        filename: `./logs/%DATE%-${name}-error.log`,
        level: 'error',
        datePattern: 'YYYY-MM-DD-HH',
      }),
      new transports.DailyRotateFile({
        filename: `./logs/%DATE%-${name}.log`,
        datePattern: 'YYYY-MM-DD-HH',
      }),
    ],
    exceptionHandlers: [
      new transports.DailyRotateFile({
        filename: `./logs/%DATE%-${name}-exceptions.log`,
        timestamp: true,
        datePattern: 'YYYY-MM-DD-HH',
      }),
    ],
  });
