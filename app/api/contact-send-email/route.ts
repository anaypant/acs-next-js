import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Configure Nodemailer transporter for Zoho SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com', // Zoho SMTP server
      port: 465, // SSL port
      secure: true, // Use SSL
      auth: {
        user: process.env.ZOHO_EMAIL_USER, // Your Zoho email
        pass: process.env.ZOHO_EMAIL_PASS, // Your Zoho app-specific password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.ZOHO_EMAIL_USER, // Your Zoho email
      to: process.env.ZOHO_EMAIL_USER, // Send to yourself
      subject: `New Contact Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
