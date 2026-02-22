import nodemailer from "nodemailer";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, date, timeSlot, message } = req.body;

    if (!name || !email || !phone || !date || !timeSlot) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;
    const adminEmail = process.env.ADMIN_EMAIL || "Itskarthikgangadharan@gmail.com";

    if (!emailUser || !emailPassword) {
      return res.status(500).json({ 
        error: "Email credentials not configured. Set EMAIL_USER and EMAIL_PASSWORD in Vercel environment." 
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f3a5c;">Session Booking Confirmation</h2>
        <p>Hi ${name},</p>
        <p>Thank you for booking a consultation session with WealthWise!</p>
        <div style="background-color: #f0f9ff; padding: 15px; margin: 20px 0;">
          <h3>📅 Your Session Details:</h3>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${timeSlot}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
        </div>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
        <p>We''ll send you a calendar invite shortly.</p>
        <p>Best regards,<br><strong>WealthWise Team</strong></p>
      </div>
    `;

    await transporter.sendMail({
      from: emailUser,
      to: email,
      subject: `Session Booked - ${name}`,
      html: emailHTML,
    });

    await transporter.sendMail({
      from: emailUser,
      to: adminEmail,
      subject: `New Session Booking - ${name}`,
      html: `<h2>New Booking</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Date:</strong> ${date}</p><p><strong>Time:</strong> ${timeSlot}</p>${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}`,
    });

    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
