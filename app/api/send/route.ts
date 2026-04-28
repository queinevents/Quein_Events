import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  console.log('[Email API] Request received');
  
  try {
    const body = await req.json();
    const { name, email, phone, eventType, eventDate, guestCount, hearAboutUs, message } = body;

    console.log('[Email API] Processing submission from:', email);

    const { data, error } = await resend.emails.send({
      from: 'Quein Events <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'info@queinevents.com'],
      replyTo: email,
      subject: `New Contact Form Submission - ${eventType}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #F59E0B 0%, #3B82F6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0;">New Contact Form Submission</h1>
              <p style="margin: 10px 0 0 0;">Quein Events</p>
            </div>
            
            <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
              <div style="margin-bottom: 20px;">
                <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Name</strong>
                <p style="margin: 5px 0 0 0; color: #111827;">${name}</p>
              </div>

              <div style="margin-bottom: 20px;">
                <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Email</strong>
                <p style="margin: 5px 0 0 0; color: #111827;"><a href="mailto:${email}" style="color: #F59E0B;">${email}</a></p>
              </div>

              <div style="margin-bottom: 20px;">
                <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Phone</strong>
                <p style="margin: 5px 0 0 0; color: #111827;"><a href="tel:${phone}" style="color: #F59E0B;">${phone}</a></p>
              </div>

              <div style="margin-bottom: 20px;">
                <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Event Type</strong>
                <p style="margin: 5px 0 0 0; color: #111827;">${eventType}</p>
              </div>

              ${eventDate ? `
                <div style="margin-bottom: 20px;">
                  <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Event Date</strong>
                  <p style="margin: 5px 0 0 0; color: #111827;">${eventDate}</p>
                </div>
              ` : ''}

              ${guestCount ? `
                <div style="margin-bottom: 20px;">
                  <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Guest Count</strong>
                  <p style="margin: 5px 0 0 0; color: #111827;">${guestCount}</p>
                </div>
              ` : ''}

              ${hearAboutUs ? `
                <div style="margin-bottom: 20px;">
                  <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase;">How They Heard About Us</strong>
                  <p style="margin: 5px 0 0 0; color: #111827;">${hearAboutUs}</p>
                </div>
              ` : ''}

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">

              <div style="background: #f0f9ff; padding: 20px; border-radius: 8px;">
                <strong style="color: #1e40af; font-size: 12px; text-transform: uppercase;">Message</strong>
                <p style="margin: 10px 0 0 0; color: #111827; white-space: pre-wrap;">${message}</p>
              </div>

              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                <p style="margin: 0;">Reply to: <a href="mailto:${email}" style="color: #F59E0B;">${name}</a></p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('[Email API] Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error.message },
        { status: 500 }
      );
    }

    console.log('[Email API] Email sent successfully:', data?.id);
    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[Email API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
