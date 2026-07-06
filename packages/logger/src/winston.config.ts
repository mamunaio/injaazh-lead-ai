import * as winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;

// Custom log format for local development
const consoleFormat = printf(({ level, message, timestamp, context }) => {
  return `${timestamp} [${context || 'Application'}] ${level}: ${message}`;
});

export const winstonConfig = {
  transports: [
    new winston.transports.Console({
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        process.env.NODE_ENV === 'production' ? winston.format.json() : combine(colorize(), consoleFormat)
      ),
    }),
    // You could add File transports or DataDog transports here for production
  ],
};
