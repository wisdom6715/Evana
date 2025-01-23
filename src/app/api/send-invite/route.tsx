import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

// Initialize OAuth2 client
const oauth2Client = new OAuth2Client({
  clientId: process.env.GMAIL_CLIENT_ID,
  clientSecret: process.env.GMAIL_CLIENT_SECRET,
  redirectUri: 'https://developers.google.com/oauthplayground'
});

// Set credentials with refresh token
oauth2Client.setCredentials({
  access_token: process.env.GMAIL_ACCESS_TOKEN,
  refresh_token: 'otru clys mack rykl',
  token_type: 'Bearer',
  scope: 'https://www.googleapis.com/auth/gmail.send'
});

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

export async function POST(request: Request) {
  try {
    const { email, companyId, companyName } = await request.json();
    
    if (!email || !companyId || !companyName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Try to refresh the access token
    try {
      await oauth2Client.refreshAccessToken();
    } catch (refreshError) {
      console.error('Token refresh error:', refreshError);
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }

    const message = [
      'From: "Your Company" <your-gmail@gmail.com>',
      `To: ${email}`,
      `Subject: Join ${companyName} on Our Platform`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      '',
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">You've been invited to join ${companyName}!</h1>
        <p>You've been invited to join your team on our platform. To get started:</p>
        <ol>
          <li>Click the button below to create your account</li>
          <li>Enter this company ID during signup: <strong>${companyId}</strong></li>
          <li>Set up your profile and start collaborating with your team</li>
        </ol>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/signup?companyId=${companyId}" 
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
            Create Your Account
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          If you have any questions, please contact your team administrator.
        </p>
      </div>`
    ].join('\n');

    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage
      }
    });

    return NextResponse.json({ success: true, messageId: res.data.id });
  } catch (error: any) {
    console.error('Gmail API Error:', error);
    return NextResponse.json(
      { error: 'Failed to send invitation', details: error.message },
      { status: 500 }
    );
  }
}