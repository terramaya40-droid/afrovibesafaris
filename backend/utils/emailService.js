import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.spacemail.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports like 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send an email notification for a new quote submission.
 * @param {Object} quoteData - The newly created quote object.
 */
export const sendQuoteNotification = async (quoteData) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL_RECEIVER;
    const mailOptions = {
      from: `"AfriVibe System" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `New Quote Request from ${quoteData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2F4F4F;">New Safari Quote Request</h2>
          <p>A new quote request has been submitted on the AfriVibe website.</p>
          <hr />
          <p><strong>Name:</strong> ${quoteData.name}</p>
          <p><strong>Email:</strong> ${quoteData.email}</p>
          <p><strong>Phone:</strong> ${quoteData.phone}</p>
          <p><strong>Nationality:</strong> ${quoteData.nationality || 'Not specified'}</p>
          <p><strong>Travelers:</strong> ${quoteData.travelers}</p>
          <p><strong>Destination:</strong> ${quoteData.destination}</p>
          <p><strong>Safari Type:</strong> ${quoteData.safariType}</p>
          <p><strong>Dates:</strong> ${new Date(quoteData.arrivalDate).toDateString()} to ${new Date(quoteData.departureDate).toDateString()}</p>
          <p><strong>Pricing Target:</strong> ${quoteData.pricingTarget}</p>
          <p><strong>Special Requests:</strong><br /> ${quoteData.specialRequests || 'None'}</p>
          <hr />
          <p style="font-size: 12px; color: #777;">Please log in to your admin dashboard to manage this request.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Quote notification email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending quote notification email:', error);
  }
};

/**
 * Send an email notification for a new testimonial submission.
 * @param {Object} testimonialData - The newly created testimonial object.
 */
export const sendTestimonialNotification = async (testimonialData) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL_RECEIVER;
    const mailOptions = {
      from: `"AfriVibe System" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `New Testimonial Submitted by ${testimonialData.userName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2F4F4F;">New Testimonial Submitted</h2>
          <p>A new testimonial requires your approval in the admin dashboard.</p>
          <hr />
          <p><strong>Reviewer Name:</strong> ${testimonialData.userName}</p>
          <p><strong>Location:</strong> ${testimonialData.userLocation}</p>
          <p><strong>Email:</strong> ${testimonialData.email}</p>
          <p><strong>Rating:</strong> ${testimonialData.rating} out of 5</p>
          <p><strong>Review Text:</strong><br /> "${testimonialData.reviewText}"</p>
          <hr />
          <p style="font-size: 12px; color: #777;">Please log in to your admin dashboard to approve or manage this testimonial.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Testimonial notification email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending testimonial notification email:', error);
  }
};
