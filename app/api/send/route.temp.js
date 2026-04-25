// TEMPORARY VERSION - Works without Resend installed
// This logs form submissions to console instead of sending emails
// Replace with route.js once Resend is installed

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, eventType, eventDate, guestCount, hearAboutUs, message } = body;

    // Log the form submission to console
    console.log('\n=================================');
    console.log('📧 NEW CONTACT FORM SUBMISSION');
    console.log('=================================');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Event Type:', eventType);
    if (eventDate) console.log('Event Date:', eventDate);
    if (guestCount) console.log('Guest Count:', guestCount);
    if (hearAboutUs) console.log('Heard About Us:', hearAboutUs);
    console.log('Message:', message);
    console.log('=================================\n');

    // Simulate successful email send
    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully (logged to console)',
        note: 'Install Resend package to enable email functionality'
      },
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
