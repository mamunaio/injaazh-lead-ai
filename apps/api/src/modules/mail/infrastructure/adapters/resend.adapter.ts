import { IMailProviderAdapter } from '../../domain/adapters/mail-provider.adapter.interface';
import { Resend } from 'resend';
import { Logger } from '@nestjs/common';

export class ResendAdapter implements IMailProviderAdapter {
  private readonly logger = new Logger(ResendAdapter.name);

  async sendEmail(from: string, to: string, subject: string, bodyHtml: string, credentials: any): Promise<boolean> {
    try {
      const resend = new Resend(credentials.apiKey);

      const response = await resend.emails.send({
        from,
        to: [to],
        subject,
        html: bodyHtml,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      this.logger.log(`Email sent via Resend. MessageId: ${response.data?.id}`);
      return !!response.data?.id;
    } catch (error: any) {
      this.logger.error(`Failed to send email via Resend: ${error.message}`);
      return false;
    }
  }
}
