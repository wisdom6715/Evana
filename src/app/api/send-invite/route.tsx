import { NextResponse } from 'next/server';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

const mailerSend = new MailerSend({
  apiKey: 'mlsn.fbb865bf3d8bb6ae0750e725dea559a4d6381a69a9807b29f32a7d76aa697760'
});

export async function POST(request: Request) {
  try {
    const { email, companyId, companyName } = await request.json();
    
    if (!email || !companyId || !companyName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const sentFrom = new Sender("trial-vywj2lpro3j47oqz.mlsender.net", "intuitionlabs");
    const recipients = [new Recipient(email)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(`Join ${companyName} on Our Platform`)
      .setHtml(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
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
        </div>
      `);

    const result = await mailerSend.email.send(emailParams);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('MailerSend Error:', error);
    return NextResponse.json(
      { error: 'Failed to send invitation' },
      { status: 500 }
    );
  }
}