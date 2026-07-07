import { IMailProviderAdapter } from '../../domain/adapters/mail-provider.adapter.interface';
import * as sgMail from '@sendgrid/mail';
import { Logger } from '@nestjs/common';

export class SendGridAdapter implements IMailProviderAdapter {
  private readonly logger = new Logger(SendGridAdapter.name);

  async sendEmail(from: string, to: string, subject: string, bodyHtml: string, credentials: any): Promise<boolean> {
    try {
      sgMail.setApiKey(credentials.apiKey);

      const msg = {
        to,
        from,
        subject,
        html: bodyHtml,
      };

      const [response] = await sgMail.send(msg);
      
      this.logger.log(`Email sent via SendGrid. StatusCode: ${response.statusCode}`);
      return response.statusCode >= 200 && response.statusCode < 300;
    } catch (error: any) {
      this.logger.error(`Failed to send email via SendGrid: ${error.message}`);
      return false;
    }
  }
}
