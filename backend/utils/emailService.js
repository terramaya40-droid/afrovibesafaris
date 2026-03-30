import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send an email notification for a new quote submission using Resend.
 * @param {Object} quoteData - The newly created quote object.
 */
export const sendQuoteNotification = async (quoteData) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL_RECEIVER;
    const { data, error } = await resend.emails.send({
      from: 'AfriVibe Safaris <noreply@afrivibesafaris.com>',
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
    });

    if (error) {
      console.error('Error sending quote notification via Resend:', error);
      return;
    }

    console.log('Quote notification email sent via Resend:', data.id);
  } catch (error) {
    console.error('Exception during quote notification:', error);
  }
};

/**
 * Send an email notification for a new testimonial submission using Resend.
 * @param {Object} testimonialData - The newly created testimonial object.
 */
export const sendTestimonialNotification = async (testimonialData) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL_RECEIVER;
    const { data, error } = await resend.emails.send({
      from: 'AfriVibe Safaris <noreply@afrivibesafaris.com>',
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
    });

    if (error) {
      console.error('Error sending testimonial notification via Resend:', error);
      return;
    }

    console.log('Testimonial notification email sent via Resend:', data.id);
  } catch (error) {
    console.error('Exception during testimonial notification:', error);
  }
};
