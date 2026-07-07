import { IMailProviderAdapter } from '../../domain/adapters/mail-provider.adapter.interface';
import * as nodemailer from 'nodemailer';
import { Logger } from '@nestjs/common';

export class GmailSmtpAdapter implements IMailProviderAdapter {
  private readonly logger = new Logger(GmailSmtpAdapter.name);

  async sendEmail(from: string, to: string, subject: string, bodyHtml: string, credentials: any): Promise<boolean> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: credentials.user,
          pass: credentials.password, // App Password if 2FA is enabled
        },
      });

      const info = await transporter.sendMail({
        from,
        to,
        subject,
        html: bodyHtml,
      });

      this.logger.log(`Email sent via Gmail SMTP. MessageId: ${info.messageId}`);
      return true;
    } catch (error: any) {
      this.logger.error(`Failed to send email via Gmail SMTP: ${error.message}`);
      return false;
    }
  }
}
