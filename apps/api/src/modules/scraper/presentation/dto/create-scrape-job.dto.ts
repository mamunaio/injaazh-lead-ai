export class CreateScrapeJobDto {
  type!: 'GoogleMaps' | 'Website' | 'LinkedIn' | 'CSV' | 'Apollo';
  parameters!: any;
}
