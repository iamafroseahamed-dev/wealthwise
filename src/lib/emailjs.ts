// Email service using backend API (nodemailer)

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  message?: string;
}

export const sendBookingEmail = async (bookingData: BookingData) => {
  try {
    // In development mode, log the booking data
    // Production email sending happens on Vercel
    if (import.meta.env.DEV) {
      console.log('📧 Booking email (dev mode):', bookingData);
      // Return mock success response for development
      return {
        success: true,
        message: 'Booking received. In production, confirmation email will be sent.',
      };
    }

    // Production: Call Vercel API endpoint
    const response = await fetch('/api/send-booking-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        date: bookingData.date,
        timeSlot: bookingData.timeSlot,
        message: bookingData.message || '',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `API error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};
