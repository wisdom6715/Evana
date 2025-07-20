"use server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NEXT_PUBLIC_SENDER_EMAIL, // Ensure consistency
    pass: process.env.NEXT_PUBLIC_APP_PASSWORD, // Should NOT be NEXT_PUBLIC_
  },
});

// Ensure correct Next.js API export
export async function POST(request: Request): Promise<Response> {
  try {
    let inviteeEmail: string | null = null;
    let inviteeName: string | null = null;
    let companyName: string | null = null;
    let companyId: string | null = null;

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      // Handle JSON request body
      const body = await request.json();
      inviteeEmail = body.inviteeEmail;
      inviteeName = body.inviteeName;
      companyId = body.companyId;
      companyName = body.companyName;
    } else if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      // Handle FormData
      const formData = await request.formData();
      inviteeEmail = formData.get("inviteeEmail")?.toString() || null;
      inviteeName = formData.get("inviteeName")?.toString() || null;
      companyId = formData.get("companyId")?.toString() || null;
      companyName = formData.get("companyName")?.toString() || null;
    } else {
      return new Response(JSON.stringify({ success: false, message: "Unsupported Content-Type" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate required fields
    if (!inviteeEmail || !inviteeName || !companyName || !companyId) {
      return new Response(JSON.stringify({ success: false, message: "Missing required form data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: inviteeEmail,
      subject: `You've beeen invited by - ${companyName}`,
      html: `
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .header {
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }
        .content {
            font-size: 16px;
            color: #555;
            margin: 20px 0;
        }
        .btn {
          display: inline-block;
          background-color: #007bff;
          color: #fdfffe !important;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: bold;
        }
        .companyId{
          font-weight: bold;
          color: #007bff;
        }
        .footer {
            font-size: 14px;
            color: #777;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">You’re Invited to Join Our Team! 🎉</div>
        <div class="content">
            <p>Dear <strong>${inviteeName}</strong>,</p>
            <p>We’re excited to invite you to join our team at <strong>${companyName}</strong>!</p>
            <p>Your skills and expertise would be a valuable addition, and we can’t wait to collaborate with you.</p>
            p>Click the button below to accept the invitation and get started:</p>
            <a href="https://intuitionlabs.com.ng/auth" class="btn">Join the Team</a>
            <p>After logging in, enter this company ID <span class='companyId'>${companyId}</span> to access the dashboard.</p>
        </div>
        <div class="footer">
          Best regards, <br />
          ${companyName}
        </div>
    </div>
</body>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${inviteeEmail}`);

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("❌ Error sending email:", error);
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
