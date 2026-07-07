import { Controller, Get, Post, Param, Query, Req, Res, Headers } from '@nestjs/common';
import { TrackingService } from '../application/services/tracking.service';
import type { Response, Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tracking')
@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  // 1x1 Transparent GIF
  private readonly pixelBuffer = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');

  @Get('open')
  async trackOpen(
    @Query('orgId') orgId: string,
    @Query('msgId') msgId: string,
    @Query('cmpId') cmpId: string,
    @Query('leadId') leadId: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    if (orgId && msgId && cmpId && leadId) {
      await this.trackingService.trackEvent(
        orgId, msgId, cmpId, leadId, 'Opened', req.headers['user-agent'], req.ip
      );
    }
    
    res.setHeader('Content-Type', 'image/gif');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.send(this.pixelBuffer);
  }

  @Get('click')
  async trackClick(
    @Query('orgId') orgId: string,
    @Query('msgId') msgId: string,
    @Query('cmpId') cmpId: string,
    @Query('leadId') leadId: string,
    @Query('url') url: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    if (orgId && msgId && cmpId && leadId) {
      await this.trackingService.trackEvent(
        orgId, msgId, cmpId, leadId, 'Clicked', req.headers['user-agent'], req.ip, { url }
      );
    }
    
    if (url) {
      res.redirect(url);
    } else {
      res.status(400).send('Missing URL');
    }
  }

  @Get('unsubscribe')
  async trackUnsubscribe(
    @Query('orgId') orgId: string,
    @Query('msgId') msgId: string,
    @Query('cmpId') cmpId: string,
    @Query('leadId') leadId: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    if (orgId && msgId && cmpId && leadId) {
      await this.trackingService.trackEvent(
        orgId, msgId, cmpId, leadId, 'Unsubscribed', req.headers['user-agent'], req.ip
      );
    }
    
    res.send('You have been successfully unsubscribed.');
  }

  // Webhooks
  @Post('webhooks/resend')
  async resendWebhook(@Req() req: Request, @Res() res: Response) {
    const payload = req.body;
    
    // Quick parse for resend
    if (payload && payload.type) {
      const type = payload.type;
      const data = payload.data;
      if (data && data.tags) {
        const { orgId, msgId, cmpId, leadId } = data.tags; // assuming we send these as tags
        if (orgId && msgId && cmpId && leadId) {
          let eventType: 'Delivered' | 'Bounced' | null = null;
          if (type === 'email.delivered') eventType = 'Delivered';
          if (type === 'email.bounced') eventType = 'Bounced';
          
          if (eventType) {
            await this.trackingService.trackEvent(
              orgId, msgId, cmpId, leadId, eventType, req.headers['user-agent'], req.ip
            );
          }
        }
      }
    }

    res.status(200).send('OK');
  }

  @Post('webhooks/sendgrid')
  async sendgridWebhook(@Req() req: Request, @Res() res: Response) {
    const payloads = Array.isArray(req.body) ? req.body : [req.body];
    
    for (const payload of payloads) {
      const { event, orgId, msgId, cmpId, leadId } = payload; // assuming these are custom args
      if (orgId && msgId && cmpId && leadId) {
          let eventType: 'Delivered' | 'Bounced' | null = null;
          if (event === 'delivered') eventType = 'Delivered';
          if (event === 'bounce') eventType = 'Bounced';
          
          if (eventType) {
            await this.trackingService.trackEvent(
              orgId, msgId, cmpId, leadId, eventType, req.headers['user-agent'], req.ip
            );
          }
      }
    }

    res.status(200).send('OK');
  }
}
