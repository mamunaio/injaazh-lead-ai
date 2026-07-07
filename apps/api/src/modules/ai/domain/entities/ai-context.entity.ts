export class AiContext {
  companySummary: string = '';
  industry: string = '';
  companySize: string = '';
  decisionMaker: {
    name: string | null;
    title: string | null;
  } = { name: null, title: null };
  painPoints: string[] = [];
  buyingSignals: string[] = [];
  technologyStack: string[] = [];
  outreachGoal: string = '';
  confidenceScore: number = 0;
  generatedAt: string = new Date().toISOString();
}
