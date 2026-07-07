import { Injectable, Logger } from '@nestjs/common';
import { IMailProviderAdapter } from '../../domain/adapters/mail-provider.adapter.interface';
import { GmailSmtpAdapter } from '../adapters/gmail-smtp.adapter';
import { Microsoft365Adapter } from '../adapters/microsoft-365.adapter';
import { SendGridAdapter } from '../adapters/sendgrid.adapter';
import { AmazonSesAdapter } from '../adapters/amazon-ses.adapter';
import { ResendAdapter } from '../adapters/resend.adapter';

@Injectable()
export class MailProviderFactory {
  private readonly logger = new Logger(MailProviderFactory.name);

  // We can cache adapters if they don't hold instance state, 
  // but since credentials might change per request, we instantiate or configure them dynamically.
  
  createAdapter(providerType: 'Gmail' | 'Microsoft365' | 'SendGrid' | 'AmazonSES' | 'Resend'): IMailProviderAdapter {
    switch (providerType) {
      case 'Gmail':
        return new GmailSmtpAdapter();
      case 'Microsoft365':
        return new Microsoft365Adapter();
      case 'SendGrid':
        return new SendGridAdapter();
      case 'AmazonSES':
        return new AmazonSesAdapter();
      case 'Resend':
        return new ResendAdapter();
      default:
        this.logger.error(`Unknown mail provider type: ${providerType}`);
        throw new Error(`Unsupported mail provider: ${providerType}`);
    }
  }
}
