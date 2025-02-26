// config/config.js
require('dotenv').config();

const config = {
  development: {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/will-she-reply-dev',
    jwtSecret: process.env.JWT_SECRET || 'dev_secret_key',
    jwtExpiry: process.env.JWT_EXPIRY || '7d',
    xaiApiKey: process.env.XAI_API_KEY,
    email: {
      service: process.env.EMAIL_SERVICE,
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
      from: process.env.EMAIL_FROM
    },
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
    corsOrigin: '*' // Allow all origins in development
  },
  test: {
    port: process.env.PORT || 3000,
    mongoUri: process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/will-she-reply-test',
    jwtSecret: process.env.JWT_SECRET || 'test_secret_key',
    jwtExpiry: '1h',
    xaiApiKey: process.env.XAI_API_KEY || 'test_key',
    email: {
      service: 'test',
      user: 'test@example.com',
      password: 'test_password',
      from: 'test@example.com'
    },
    clientUrl: 'http://localhost:3000',
    corsOrigin: '*'
  },
  production: {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiry: process.env.JWT_EXPIRY || '7d',
    xaiApiKey: process.env.XAI_API_KEY,
    email: {
      service: process.env.EMAIL_SERVICE,
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
      from: process.env.EMAIL_FROM
    },
    clientUrl: process.env.CLIENT_URL,
    corsOrigin: process.env.CORS_ORIGIN || 'https://will-she-reply.com' // Restrict to app domain in production
  }
};

// Determine environment
const env = process.env.NODE_ENV || 'development';

// Validate required environment variables in production
if (env === 'production') {
  const requiredEnvVars = [
    'MONGODB_URI',
    'JWT_SECRET',
    'XAI_API_KEY',
    'EMAIL_SERVICE',
    'EMAIL_USER',
    'EMAIL_PASSWORD',
    'EMAIL_FROM',
    'CLIENT_URL'
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.error(`Error: Environment variable ${envVar} is required in production.`);
      process.exit(1);
    }
  }
}

module.exports = config[env];