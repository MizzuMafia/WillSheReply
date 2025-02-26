// services/emailService.js
const nodemailer = require('nodemailer');
const config = require('../config/config');

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: config.email.service,
  auth: {
    user: config.email.user,
    pass: config.email.password
  }
});

// Verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email service error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

const emailTemplates = {
  welcome: (username, verificationLink) => ({
    subject: 'Welcome to Will She Reply? - Verify Your Email',
    text: `Hi ${username},\n\nWelcome to Will She Reply! Please verify your email by clicking on the following link: ${verificationLink}\n\nThank you,\nThe Will She Reply Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #FF6B8E; text-align: center;">Welcome to Will She Reply!</h2>
        <p>Hi ${username},</p>
        <p>Thank you for joining our community. To complete your registration, please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationLink}" style="background-color: #FF6B8E; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email</a>
        </div>
        <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${verificationLink}</p>
        <p>This verification link will expire in 24 hours.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="text-align: center; color: #999; font-size: 12px;">
          Will She Reply? © ${new Date().getFullYear()}
        </p>
      </div>
    `
  }),
  
  passwordReset: (username, resetLink) => ({
    subject: 'Reset Your Will She Reply? Password',
    text: `Hi ${username},\n\nYou requested a password reset. Please click the following link to reset your password: ${resetLink}\n\nIf you didn't request this, please ignore this email.\n\nThank you,\nThe Will She Reply Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #FF6B8E; text-align: center;">Password Reset Request</h2>
        <p>Hi ${username},</p>
        <p>We received a request to reset your password. Please click the button below to create a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #FF6B8E; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
        </div>
        <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${resetLink}</p>
        <p>This reset link will expire in 1 hour. If you didn't request this reset, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="text-align: center; color: #999; font-size: 12px;">
          Will She Reply? © ${new Date().getFullYear()}
        </p>
      </div>
    `
  }),
  
  newCredits: (username, credits, totalCredits) => ({
    subject: 'Credits Added to Your Will She Reply? Account',
    text: `Hi ${username},\n\nWe've added ${credits} credits to your account. Your new balance is ${totalCredits} credits.\n\nThank you,\nThe Will She Reply Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #FF6B8E; text-align: center;">Credits Added!</h2>
        <p>Hi ${username},</p>
        <p>Great news! We've added <strong>${credits} credits</strong> to your account.</p>
        <div style="background-color: #f9f9f9; border-radius: 5px; padding: 15px; margin: 20px 0; text-align: center;">
          <p style="margin: 0; font-size: 14px;">Your new balance</p>
          <p style="margin: 5px 0; font-size: 24px; font-weight: bold; color: #FF6B8E;">${totalCredits} Credits</p>
        </div>
        <p>You can now continue chatting with your favorite AI companions!</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${config.clientUrl}" style="background-color: #FF6B8E; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to App</a>
        </div>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="text-align: center; color: #999; font-size: 12px;">
          Will She Reply? © ${new Date().getFullYear()}
        </p>
      </div>
    `
  })
};

/**
 * Send email
 * @param {string} to - Recipient email
 * @param {string} templateName - Template name (welcome, passwordReset, etc.)
 * @param {Object} data - Data to populate template
 */
const sendEmail = async (to, templateName, data) => {
  try {
    if (!emailTemplates[templateName]) {
      throw new Error(`Email template '${templateName}' not found`);
    }
    
    const template = emailTemplates[templateName](...Object.values(data));
    
    const mailOptions = {
      from: config.email.from,
      to,
      subject: template.subject,
      text: template.text,
      html: template.html
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send verification email
 */
const sendVerificationEmail = async (user, token) => {
  const verificationLink = `${config.clientUrl}/verify-email/${token}`;
  return sendEmail(user.email, 'welcome', { username: user.username, verificationLink });
};

/**
 * Send password reset email
 */
const sendPasswordResetEmail = async (user, token) => {
  const resetLink = `${config.clientUrl}/reset-password/${token}`;
  return sendEmail(user.email, 'passwordReset', { username: user.username, resetLink });
};

/**
 * Send credit notification email
 */
const sendCreditNotification = async (user, creditsAdded) => {
  return sendEmail(user.email, 'newCredits', { 
    username: user.username, 
    credits: creditsAdded, 
    totalCredits: user.credits 
  });
};

module.exports = {
  sendEmail,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendCreditNotification
};