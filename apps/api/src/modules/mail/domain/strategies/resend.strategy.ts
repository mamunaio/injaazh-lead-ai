import { Injectable, Logger } from '@nestjs/common';
import { IMailStrategy } from './mail.strategy.interface';
import { Resend } from 'resend';

@Injectable()
export class ResendStrategy implements IMailStrategy {
  private readonly logger = new Logger(ResendStrategy.name);

  async sendEmail(to: string, subject: string, htmlBody: string, fromEmail: string, fromName: string, credentials: any): Promise<boolean> {
    try {
      const resend = new Resend(credentials.apiKey);
      
      const { data, error } = await resend.emails.send({
        from: `${fromName} <${fromEmail}>`,
        to: [to],
        subject,
        html: htmlBody,
      });

      if (error) {
        this.logger.error(`Resend Error: ${error.message}`);
        return false;
      }

      this.logger.log(`Resend dispatched successfully to ${to}, id: ${data?.id}`);
      return true;
    } catch (err: any) {
      this.logger.error(`Failed to send via Resend: ${err.message}`);
      return false;
    }
  }
}
