import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

console.log('--- Email Connection Test ---');
console.log('Host:', process.env.SMTP_HOST || 'mail.spacemail.com');
console.log('Port:', process.env.SMTP_PORT || '465');
console.log('User:', process.env.SMTP_USER ? 'Set' : 'Missing!');
console.log('Pass:', process.env.SMTP_PASS ? 'Set' : 'Missing!');
console.log('Receiver:', process.env.ADMIN_EMAIL_RECEIVER ? 'Set' : 'Missing!');
console.log('-----------------------------');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.spacemail.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Adding this can sometimes help with strict servers
  tls: {
    rejectUnauthorized: false
  }
});

async function runTest() {
  try {
    console.log('Verifying connection to SMTP server...');
    const verifyResult = await transporter.verify();
    console.log('Connection verified successfully:', verifyResult);

    console.log('Attempting to send a test email...');
    const info = await transporter.sendMail({
      from: `"SMTP Test" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL_RECEIVER,
      subject: 'AfriVibe SMTP Test Success',
      text: 'If you are reading this, your SMTP settings are 100% correct.',
    });
    console.log('Test email sent successfully! Message ID:', info.messageId);
  } catch (error) {
    console.error('\n!!! ERROR OCCURRED !!!\n');
    console.error(error);
  }
}

runTest();
