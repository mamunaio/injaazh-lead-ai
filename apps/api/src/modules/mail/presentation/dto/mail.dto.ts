export class CreateMailAccountDto {
  provider!: 'Gmail' | 'Microsoft365' | 'SendGrid' | 'AmazonSES' | 'Resend';
  credentials!: any;
  fromEmail!: string;
  fromName!: string;
}
