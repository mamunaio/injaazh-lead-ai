export interface LlmResponse {
  content: string;
  tokensUsed?: number;
  model: string;
}
