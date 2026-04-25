import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, eventType, eventDate, guestCount, hearAboutUs, message } = body;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Quein Events Contact <noreply@queinevents.com>',
      to: [process.env.CONTACT_EMAIL || 'info@queinevents.com'],
      replyTo: email,
      subject: `New Contact Form Submission - ${eventType}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
              }
              .container {
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header {
                background: linear-gradient(135deg, #F59E0B 0%, #3B82F6 100%);
                color: white;
                padding: 40px 30px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 700;
              }
              .header p {
                margin: 10px 0 0 0;
                opacity: 0.95;
                font-size: 16px;
              }
              .content {
                padding: 30px;
              }
              .field {
                margin-bottom: 20px;
                padding: 16px;
                background: #f9fafb;
                border-radius: 8px;
                border-left: 4px solid #F59E0B;
              }
              .field-label {
                font-weight: 600;
                color: #6b7280;
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.8px;
                margin-bottom: 6px;
              }
              .field-value {
                color: #111827;
                font-size: 16px;
                word-wrap: break-word;
              }
              .field-value a {
                color: #F59E0B;
                text-decoration: none;
              }
              .field-value a:hover {
                text-decoration: underline;
              }
              .message-box {
                background: #f0f9ff;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #3B82F6;
                margin-top: 20px;
              }
              .message-box .field-label {
                color: #1e40af;
              }
              .message-box .field-value {
                white-space: pre-wrap;
                line-height: 1.8;
              }
              .footer {
                text-align: center;
                padding: 25px 30px;
                background: #f9fafb;
                color: #6b7280;
                font-size: 14px;
                border-top: 1px solid #e5e7eb;
              }
              .footer a {
                color: #F59E0B;
                text-decoration: none;
                font-weight: 600;
              }
              .footer a:hover {
                text-decoration: underline;
              }
              .divider {
                height: 1px;
                background: linear-gradient(to right, transparent, #e5e7eb, transparent);
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 New Contact Form Submission</h1>
                <p>Quein Conference and Event Organization WLL</p>
              </div>
              
              <div class="content">
                <div class="field">
                  <div class="field-label">Full Name</div>
                  <div class="field-value">${name}</div>
                </div>

                <div class="field">
                  <div class="field-label">Email Address</div>
                  <div class="field-value">
                    <a href="mailto:${email}">${email}</a>
                  </div>
                </div>

                <div class="field">
                  <div class="field-label">Phone Number</div>
                  <div class="field-value">
                    <a href="tel:${phone}">${phone}</a>
                  </div>
                </div>

                <div class="field">
                  <div class="field-label">Event Type</div>
                  <div class="field-value">${eventType}</div>
                </div>

                ${eventDate ? `
                  <div class="field">
                    <div class="field-label">Event Date</div>
                    <div class="field-value">${new Date(eventDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</div>
                  </div>
                ` : ''}

                ${guestCount ? `
                  <div class="field">
                    <div class="field-label">Expected Guest Count</div>
                    <div class="field-value">${guestCount}</div>
                  </div>
                ` : ''}

                ${hearAboutUs ? `
                  <div class="field">
                    <div class="field-label">How They Heard About Us</div>
                    <div class="field-value">${hearAboutUs}</div>
                  </div>
                ` : ''}

                <div class="divider"></div>

                <div class="message-box">
                  <div class="field-label">Message</div>
                  <div class="field-value">${message}</div>
                </div>
              </div>

              <div class="footer">
                <p style="margin: 0 0 10px 0;">This email was sent from the Quein Events contact form</p>
                <p style="margin: 0;">
                  <a href="mailto:${email}">Reply to ${name}</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
