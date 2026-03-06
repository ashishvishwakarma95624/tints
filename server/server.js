import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
}));

// Rate limiting - prevent spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { success: false, error: 'Too many requests, please try again later.' }
});

app.use('/api/send-email', limiter);

// Create transporter with detailed logging
const createTransporter = () => {
  console.log('📧 Creating email transporter...');
  console.log('📧 Email User:', process.env.EMAIL_USER);
  console.log('📧 App Password length:', process.env.EMAIL_APP_PASSWORD?.length);

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
    debug: true, // Enable debug logs
    logger: true, // Log information
  });
};

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    email: process.env.EMAIL_USER ? 'Configured' : 'Not configured'
  });
});

// Email send endpoint
app.post('/api/send-email', async (req, res) => {
  console.log('='.repeat(50));
  console.log('📩 New email request received at:', new Date().toISOString());
  console.log('Request body:', req.body);

  const { name, email, phone, subject, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    console.log('❌ Validation failed: missing fields');
    return res.status(400).json({ 
      success: false, 
      error: 'Name, email, and message are required' 
    });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log('❌ Invalid email format:', email);
    return res.status(400).json({ 
      success: false, 
      error: 'Please provide a valid email address' 
    });
  }

  try {
    // Create transporter
    const transporter = createTransporter();

    // Verify transporter connection
    console.log('🔍 Verifying transporter connection...');
    await transporter.verify();
    console.log('✅ Transporter verified successfully');

    // Email template for client (confirmation)
    const clientMailOptions = {
      from: `"Guru Creations" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `✨ Thank you for contacting Guru Creations`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #B89B7B 0%, #A88967 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .message-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #B89B7B; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
            h1 { margin: 0; font-size: 28px; }
            h2 { color: #B89B7B; margin-top: 0; }
            .details { background: #fff3e0; padding: 15px; border-radius: 8px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Guru Creations</h1>
              <p style="margin: 5px 0 0; opacity: 0.9;">Creative Excellence</p>
            </div>
            
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>Thank you for reaching out to <strong>Guru Creations</strong>! We're excited to connect with you.</p>
              
              <div class="message-box">
                <p style="margin-top: 0;"><strong>We've received your inquiry and our team will get back to you within <span style="color: #B89B7B;">24 hours</span>.</strong></p>
              </div>
              
              <div class="details">
                <h3 style="color: #B89B7B; margin-top: 0;">📋 Your Message Details:</h3>
                <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
                <p><strong>Message:</strong></p>
                <p style="background: white; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, '<br>')}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <p>In the meantime, you can:</p>
              <ul>
                <li>Visit our website to see our portfolio</li>
                <li>Follow us on social media for updates</li>
                <li>Call us directly at <strong>(555) 123-4567</strong> for urgent matters</li>
              </ul>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} Guru Creations. All rights reserved.</p>
              <p>Windsor, ON, Canada · Essex, ON, Canada</p>
              <p style="margin-top: 10px; font-size: 11px; color: #999;">This is an automated message, please do not reply directly to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hello ${name},

Thank you for contacting Guru Creations! We'll get back to you within 24 hours.

Your Message Details:
Subject: ${subject || 'General Inquiry'}
Message: ${message}
Phone: ${phone || 'Not provided'}

Best regards,
Guru Creations Team
      `
    };

    // Email template for business (notification)
    const businessMailOptions = {
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🔔 NEW CONTACT: ${subject || 'General Inquiry'} from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background: #B89B7B; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .info-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; }
            .urgent { background: #fff3cd; border: 1px solid #ffeeba; padding: 15px; border-radius: 5px; }
            h2 { color: #B89B7B; }
            .label { font-weight: bold; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📬 New Contact Form Submission</h1>
            </div>
            
            <div class="content">
              <div class="urgent">
                <p style="margin: 0;"><strong>⏰ Time:</strong> ${new Date().toLocaleString()}</p>
                <p style="margin: 5px 0 0;"><strong>🌐 Source:</strong> Website Contact Form</p>
              </div>
              
              <div class="info-box">
                <h2>👤 Contact Information</h2>
                <p><span class="label">Name:</span> ${name}</p>
                <p><span class="label">Email:</span> <a href="mailto:${email}">${email}</a></p>
                <p><span class="label">Phone:</span> ${phone || 'Not provided'}</p>
              </div>
              
              <div class="info-box">
                <h2>📝 Message Details</h2>
                <p><span class="label">Subject:</span> ${subject || 'General Inquiry'}</p>
                <p><span class="label">Message:</span></p>
                <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin-top: 10px;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 5px;">
                <p style="margin: 0;"><strong>📋 Next Steps:</strong></p>
                <p style="margin: 10px 0 0;">1. Respond within 24 hours</p>
                <p style="margin: 5px 0;">2. Save contact to CRM</p>
                <p style="margin: 5px 0;">3. Follow up if needed</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
NEW CONTACT FORM SUBMISSION

Time: ${new Date().toLocaleString()}
Source: Website Contact Form

CONTACT INFORMATION:
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

MESSAGE DETAILS:
Subject: ${subject || 'General Inquiry'}
Message: ${message}

Please respond within 24 hours.
      `
    };

    // Send both emails
    console.log('📤 Sending client confirmation email to:', email);
    const clientInfo = await transporter.sendMail(clientMailOptions);
    console.log('✅ Client email sent:', clientInfo.messageId);

    console.log('📤 Sending business notification email');
    const businessInfo = await transporter.sendMail(businessMailOptions);
    console.log('✅ Business email sent:', businessInfo.messageId);

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Emails sent successfully!',
      data: {
        clientEmailId: clientInfo.messageId,
        businessEmailId: businessInfo.messageId
      }
    });

  } catch (error) {
    console.error('❌ Email error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    });

    // Handle specific errors
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        error: 'Email authentication failed. Please check your Gmail App Password.',
        details: 'Make sure you are using an App Password (16 characters without spaces)'
      });
    } else if (error.code === 'ESOCKET') {
      return res.status(500).json({
        success: false,
        error: 'Network connection error. Please check your internet.'
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Failed to send email: ' + error.message
      });
    }
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email configured for: ${process.env.EMAIL_USER}`);
  console.log(`🔗 Client URL: ${process.env.CLIENT_URL}`);
  console.log('='.repeat(50));
});