import { IMailProviderAdapter } from '../../domain/adapters/mail-provider.adapter.interface';
import * as nodemailer from 'nodemailer';
import { Logger } from '@nestjs/common';

export class Microsoft365Adapter implements IMailProviderAdapter {
  private readonly logger = new Logger(Microsoft365Adapter.name);

  async sendEmail(from: string, to: string, subject: string, bodyHtml: string, credentials: any): Promise<boolean> {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        requireTLS: true,
        auth: {
          user: credentials.user,
          pass: credentials.password,
        },
      });

      const info = await transporter.sendMail({
        from,
        to,
        subject,
        html: bodyHtml,
      });

      this.logger.log(`Email sent via Microsoft365 SMTP. MessageId: ${info.messageId}`);
      return true;
    } catch (error: any) {
      this.logger.error(`Failed to send email via Microsoft365 SMTP: ${error.message}`);
      return false;
    }
  }
}
