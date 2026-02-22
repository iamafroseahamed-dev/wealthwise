import emailjs from 'emailjs-com';

// Initialize EmailJS
const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
if (emailjsPublicKey) {
  emailjs.init(emailjsPublicKey);
}

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  message?: string;
}

export const sendBookingEmail = async (bookingData: BookingData) => {
  if (!emailjsPublicKey) {
    console.error('EmailJS not configured');
    throw new Error('Email service not configured');
  }

  try {
    const templateParams = {
      to_email: 'Itskarthikgangadharan@gmail.com',
      user_name: bookingData.name,
      user_email: bookingData.email,
      user_phone: bookingData.phone,
      booking_date: bookingData.date,
      booking_time: bookingData.timeSlot,
      message: bookingData.message || 'No additional message provided',
    };

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    if (!serviceId || !templateId) {
      throw new Error('EmailJS configuration incomplete');
    }

    const response = await emailjs.send(serviceId, templateId, templateParams);
    return response;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};
