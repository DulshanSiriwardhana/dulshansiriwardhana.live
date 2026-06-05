import nodemailer from 'nodemailer';

const createTransporter = () => {
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailService = process.env.EMAIL_SERVICE || 'gmail';

    if (!emailUser || !emailPass) {
        console.warn('EMAIL_USER or EMAIL_PASS not set. Email notifications disabled.');
        return null;
    }

    return nodemailer.createTransport({
        service: emailService,
        auth: {
            user: emailUser,
            pass: emailPass,
        },
    });
};

export const sendContactNotification = async ({ name, email, subject, message }) => {
    const transporter = createTransporter();
    if (!transporter) {
        console.log('Email notification skipped');
        return false;
    }

    const ownerEmail = process.env.OWNER_EMAIL || process.env.EMAIL_USER;

    const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); border-radius: 16px; overflow: hidden; border: 1px solid #22c55e33;">
      <div style="background: linear-gradient(90deg, #22c55e22, #16a34a22); padding: 32px 24px; border-bottom: 1px solid #22c55e33;">
        <h1 style="margin: 0; color: #22c55e; font-size: 24px; font-weight: 700;">
          New Contact Message
        </h1>
        <p style="margin: 8px 0 0; color: #9ca3af; font-size: 14px;">
          Someone reached out via dulshansiriwardhana.live
        </p>
      </div>
      
      <div style="padding: 24px;">
        <div style="background: #111; border: 1px solid #22c55e22; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #9ca3af; font-size: 13px; width: 80px; vertical-align: top;">From</td>
              <td style="padding: 8px 0; color: #f3f4f6; font-size: 15px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #9ca3af; font-size: 13px; vertical-align: top;">Email</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${email}" style="color: #22c55e; text-decoration: none; font-size: 15px;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #9ca3af; font-size: 13px; vertical-align: top;">Subject</td>
              <td style="padding: 8px 0; color: #f3f4f6; font-size: 15px;">${subject}</td>
            </tr>
          </table>
        </div>
        
        <div style="background: #111; border: 1px solid #22c55e22; border-radius: 12px; padding: 20px;">
          <p style="color: #9ca3af; font-size: 13px; margin: 0 0 12px;">Message</p>
          <p style="color: #e5e7eb; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>

        <div style="margin-top: 20px; text-align: center;">
          <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" 
             style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #22c55e22, #16a34a22); border: 1px solid #22c55e66; border-radius: 8px; color: #22c55e; text-decoration: none; font-weight: 600; font-size: 14px;">
            Reply to ${name}
          </a>
        </div>
      </div>
      
      <div style="padding: 16px 24px; border-top: 1px solid #22c55e11; text-align: center;">
        <p style="margin: 0; color: #4b5563; font-size: 12px;">
          Sent from dulshansiriwardhana.live contact form
        </p>
      </div>
    </div>
  `;

    try {
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: ownerEmail,
            replyTo: email,
            subject: `New Message: ${subject}`,
            html: htmlContent,
            text: `New contact message from ${name} (${email})\n\nSubject: ${subject}\n\nMessage:\n${message}`,
        });

        console.log(`Email notification sent for message from ${name}`);
        return true;
    } catch (error) {
        console.error('Failed to send email notification:', error.message);
        return false;
    }
};

export const sendAutoReply = async ({ name, email, subject }) => {
    const transporter = createTransporter();
    if (!transporter) return false;

    const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); border-radius: 16px; overflow: hidden; border: 1px solid #22c55e33;">
      <div style="background: linear-gradient(90deg, #22c55e22, #16a34a22); padding: 32px 24px; border-bottom: 1px solid #22c55e33;">
        <h1 style="margin: 0; color: #22c55e; font-size: 24px; font-weight: 700;">
          Message Received
        </h1>
      </div>
      
      <div style="padding: 24px;">
        <p style="color: #e5e7eb; font-size: 16px; line-height: 1.7; margin: 0 0 16px;">
          Hi <strong style="color: #22c55e;">${name}</strong>,
        </p>
        <p style="color: #d1d5db; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
          Thank you for reaching out! I've received your message regarding <em>"${subject}"</em> and will get back to you as soon as possible.
        </p>
        <p style="color: #d1d5db; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
          In the meantime, feel free to check out my latest work on my portfolio.
        </p>
        
        <div style="text-align: center; margin: 24px 0;">
          <a href="https://dulshansiriwardhana.live" 
             style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #22c55e22, #16a34a22); border: 1px solid #22c55e66; border-radius: 8px; color: #22c55e; text-decoration: none; font-weight: 600; font-size: 14px;">
            Visit My Portfolio
          </a>
        </div>

        <p style="color: #9ca3af; font-size: 14px; line-height: 1.6; margin: 16px 0 0;">
          Best regards,<br>
          <strong style="color: #22c55e;">Dulshan Siriwardhana</strong><br>
          <span style="color: #6b7280;">Blockchain Developer & Full-Stack Developer</span>
        </p>
      </div>
      
      <div style="padding: 16px 24px; border-top: 1px solid #22c55e11; text-align: center;">
        <p style="margin: 0; color: #4b5563; font-size: 12px;">
          This is an automated reply from dulshansiriwardhana.live
        </p>
      </div>
    </div>
  `;

    try {
        await transporter.sendMail({
            from: `"Dulshan Siriwardhana" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Re: ${subject}`,
            html: htmlContent,
            text: `Hi ${name},\n\nThank you for reaching out! I've received your message regarding "${subject}" and will get back to you as soon as possible.\n\nBest regards,\nDulshan Siriwardhana`,
        });

        console.log(`Auto-reply sent to ${email}`);
        return true;
    } catch (error) {
        console.error('Failed to send auto-reply:', error.message);
        return false;
    }
};
