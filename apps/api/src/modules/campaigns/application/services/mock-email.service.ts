import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MockEmailService {
  private readonly logger = new Logger(MockEmailService.name);

  async sendEmail(to: string, subject: string, htmlBody: string): Promise<boolean> {
    this.logger.log(`[MOCK EMAIL SENT] -> To: ${to}`);
    this.logger.log(`Subject: ${subject}`);
    this.logger.debug(`Body Preview: ${htmlBody.substring(0, 100)}...`);
    
    // Simulate network delay for sending email
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate 95% success rate
    const isSuccess = Math.random() > 0.05;
    if (!isSuccess) {
      this.logger.error(`[MOCK EMAIL FAILED] -> To: ${to}`);
    }

    return isSuccess;
  }
}
