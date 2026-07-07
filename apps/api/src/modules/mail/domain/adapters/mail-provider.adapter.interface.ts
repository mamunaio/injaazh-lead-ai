export interface IMailProviderAdapter {
  sendEmail(from: string, to: string, subject: string, bodyHtml: string, credentials: any): Promise<boolean>;
}
