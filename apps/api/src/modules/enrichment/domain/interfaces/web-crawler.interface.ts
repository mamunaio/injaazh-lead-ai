export interface IWebCrawler {
  crawl(url: string): Promise<string | null>;
}
