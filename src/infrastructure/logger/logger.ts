import winston from 'winston';

// Define custom log levels and colors
const customLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const customColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'blue',
  debug: 'magenta',
};

// Apply the colors to Winston
winston.addColors(customColors);

// Define the custom log format
const logFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

// Logger configuration for development
const devLogger = winston.createLogger({
  levels: customLevels, // Use custom log levels
  level: 'debug', // More verbose logging in development
  format: winston.format.combine(
    winston.format.timestamp(), 
    winston.format.errors({ stack: true }), 
    logFormat // Custom log format
  ),
  transports: [
    // Console transport with color for dev
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }), // Apply color to all log levels
        winston.format.simple()
      ),
    }),
  ],
  exceptionHandlers: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
      ),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
      ),
    }),
  ],
});

// Logger configuration for production
const prodLogger = winston.createLogger({
  levels: customLevels, // Use custom log levels
  level: 'info', // Only log info and above in production
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }), 
    winston.format.json() 
  ),
  transports: [
    // File transport for error logs in production
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
    }),
    // File transport for all logs in production
    new winston.transports.File({
      filename: 'combined.log',
    }),
  ],
  exceptionHandlers: [
    // Handle uncaught exceptions and log them
    new winston.transports.File({ filename: 'exceptions.log' }),
  ],
  rejectionHandlers: [
    // Handle unhandled promise rejections
    new winston.transports.File({ filename: 'rejections.log' }),
  ],
});

// Choose logger configuration based on environment
const logger = process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

export default logger;
