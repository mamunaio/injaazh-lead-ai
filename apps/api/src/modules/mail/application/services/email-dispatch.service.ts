import { Injectable, Inject, Logger } from '@nestjs/common';
import type { IMailAccountRepository } from '../../domain/repositories/mail-account.repository.interface';
import { MAIL_ACCOUNT_REPOSITORY } from '../../domain/repositories/mail-account.repository.interface';
import { MailProviderFactory } from '../../infrastructure/factories/mail-provider.factory';
import * as cheerio from 'cheerio';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailDispatchService {
  private readonly logger = new Logger(EmailDispatchService.name);
  private readonly apiBaseUrl: string;

  constructor(
    @Inject(MAIL_ACCOUNT_REPOSITORY) private readonly mailAccountRepo: IMailAccountRepository,
    private readonly mailProviderFactory: MailProviderFactory,
    private readonly configService: ConfigService,
  ) {
    this.apiBaseUrl = this.configService.get<string>('API_BASE_URL') || 'http://localhost:3000';
  }

  async sendEmail(
    organizationId: string, 
    to: string, 
    subject: string, 
    htmlBody: string,
    leadId?: string,
    campaignId?: string
  ): Promise<{ success: boolean; messageId?: string }> {
    const defaultAccount = await this.mailAccountRepo.getDefault(organizationId);
    
    if (!defaultAccount) {
      this.logger.error(`No default mail account found for organization ${organizationId}`);
      return { success: false };
    }

    const { provider, credentials, fromEmail, fromName } = defaultAccount;
    const fromStr = `${fromName} <${fromEmail}>`;

    // Generate internal Message ID
    const messageId = crypto.randomUUID();

    // Inject Tracking Pixel & Wrap Links if leadId and campaignId are present
    let finalHtml = htmlBody;
    if (leadId && campaignId) {
      finalHtml = this.injectTracking(finalHtml, organizationId, messageId, campaignId, leadId);
    }

    try {
      const adapter = this.mailProviderFactory.createAdapter(provider);
      // In a real scenario we might pass messageId down to the provider to map it, 
      // but for this MVP, we trust our internal tracking via the embedded pixel and links.
      const sent = await adapter.sendEmail(fromStr, to, subject, finalHtml, credentials);
      return { success: sent, messageId };
    } catch (error: any) {
      this.logger.error(`Error sending email: ${error.message}`);
      return { success: false };
    }
  }

  private injectTracking(html: string, orgId: string, msgId: string, cmpId: string, leadId: string): string {
    const $ = cheerio.load(html);

    // Wrap links for click tracking
    $('a').each((_, el) => {
      const href = $(el).attr('href');
      if (href && !href.startsWith('mailto:')) {
        const encodedUrl = encodeURIComponent(href);
        const trackingUrl = `${this.apiBaseUrl}/tracking/click?orgId=${orgId}&msgId=${msgId}&cmpId=${cmpId}&leadId=${leadId}&url=${encodedUrl}`;
        $(el).attr('href', trackingUrl);
      }
    });

    // Add un-subscribe link at the bottom if not present
    // MVP: just append a pixel, let users handle unsub in template, but we will add a default unsub link for safety
    const unsubUrl = `${this.apiBaseUrl}/tracking/unsubscribe?orgId=${orgId}&msgId=${msgId}&cmpId=${cmpId}&leadId=${leadId}`;
    $('body').append(`<br><br><small><a href="${unsubUrl}">Unsubscribe</a></small>`);

    // Add open tracking pixel
    const pixelUrl = `${this.apiBaseUrl}/tracking/open?orgId=${orgId}&msgId=${msgId}&cmpId=${cmpId}&leadId=${leadId}`;
    $('body').append(`<img src="${pixelUrl}" width="1" height="1" style="display:none;" />`);

    return $.html();
  }
}
