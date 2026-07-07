export interface IMailStrategy {
  sendEmail(
    to: string,
    subject: string,
    htmlBody: string,
    fromEmail: string,
    fromName: string,
    credentials: any
  ): Promise<boolean>;
}
