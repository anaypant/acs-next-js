import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const body = await req.json();
    console.log(body);
    const { name, email, message } = body;
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }


    try {
      const transporter = nodemailer.createTransport({
        host:"smtp.zoho.com",
        service: 'Zoho', // Use your email service provider or SMTP settings
        port: 587,
        secure: false,   
        auth: {
          user: "anay.pant@automatedconsultancy.com", // Set your email in .env file
          pass: "M0bucha3!!", // Set your email password in .env file
        },
        tls: {
            rejectUnauthorized: false
        }   
      });

      const mailOptions = {
        from: email,
        to: process.env.RECEIVER_EMAIL, // Email where the messages will be sent
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      };

      await transporter.sendMail(mailOptions);

      return NextResponse.json({ success: 'Message sent successfully!' }, { status: 200 });
    } catch (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error: 'Failed to send the message.' }, { status: 500 });
    }
  
}