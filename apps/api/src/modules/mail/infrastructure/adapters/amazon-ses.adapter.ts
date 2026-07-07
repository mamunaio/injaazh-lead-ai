import { IMailProviderAdapter } from '../../domain/adapters/mail-provider.adapter.interface';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { Logger } from '@nestjs/common';

export class AmazonSesAdapter implements IMailProviderAdapter {
  private readonly logger = new Logger(AmazonSesAdapter.name);

  async sendEmail(from: string, to: string, subject: string, bodyHtml: string, credentials: any): Promise<boolean> {
    try {
      const sesClient = new SESClient({
        region: credentials.region,
        credentials: {
          accessKeyId: credentials.accessKeyId,
          secretAccessKey: credentials.secretAccessKey,
        },
      });

      const command = new SendEmailCommand({
        Source: from,
        Destination: {
          ToAddresses: [to],
        },
        Message: {
          Subject: { Data: subject },
          Body: { Html: { Data: bodyHtml } },
        },
      });

      const response = await sesClient.send(command);
      
      this.logger.log(`Email sent via Amazon SES. MessageId: ${response.MessageId}`);
      return !!response.MessageId;
    } catch (error: any) {
      this.logger.error(`Failed to send email via Amazon SES: ${error.message}`);
      return false;
    }
  }
}
