export class CreateScrapeJobDto {
  type!: 'GoogleMaps' | 'Website' | 'LinkedIn' | 'CSV';
  parameters!: any;
}
