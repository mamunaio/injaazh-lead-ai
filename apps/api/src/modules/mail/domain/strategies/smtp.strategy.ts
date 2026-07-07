import { Injectable, Logger } from '@nestjs/common';
import { IMailStrategy } from './mail.strategy.interface';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SmtpStrategy implements IMailStrategy {
  private readonly logger = new Logger(SmtpStrategy.name);

  async sendEmail(to: string, subject: string, htmlBody: string, fromEmail: string, fromName: string, credentials: any): Promise<boolean> {
    try {
      // For Gmail/Outlook wrappers, credentials can just contain host/port/secure/auth
      const transporter = nodemailer.createTransport({
        host: credentials.host,
        port: credentials.port,
        secure: credentials.secure || false, // true for 465, false for other ports
        auth: {
          user: credentials.user,
          pass: credentials.pass,
        },
      });

      const info = await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to,
        subject,
        html: htmlBody,
      });

      this.logger.log(`SMTP dispatched successfully to ${to}, MessageId: ${info.messageId}`);
      return true;
    } catch (err: any) {
      this.logger.error(`Failed to send via SMTP: ${err.message}`);
      return false;
    }
  }
}
