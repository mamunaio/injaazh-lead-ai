import React from 'react';
import { Company } from '../../../mocks/companies';
import { Sparkles, TrendingUp, Cpu, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface CompanyAIInsightsCardProps {
  company: Company;
}

export function CompanyAIInsightsCard({ company }: CompanyAIInsightsCardProps) {
  const { intentSignals, techStack, swot } = company.aiInsights;

  return (
    <div className="bg-card border border-border rounded-xl p-6 h-full">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
          <Sparkles className="w-4 h-4" />
        </div>
        <h2 className="text-lg font-semibold text-card-foreground">AI Account Insights</h2>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-primary" /> 
            Intent Signals
          </h3>
          <div className="space-y-3">
            {intentSignals.map((signal, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <p className="text-sm text-foreground">{signal}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-primary" /> 
            Tech Stack Detected
          </h3>
          <div className="flex flex-wrap gap-2">
            {techStack.map(tech => (
              <span key={tech} className="px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium border border-border">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-primary" /> 
            SWOT Analysis
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/5">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400 mb-3">
                <CheckCircle2 className="w-4 h-4" /> Strengths
              </h4>
              <ul className="space-y-2">
                {swot.strengths.map((str, i) => (
                  <li key={i} className="text-sm text-secondary-foreground flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span> {str}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400 mb-3">
                <ShieldAlert className="w-4 h-4" /> Potential Risks
              </h4>
              <ul className="space-y-2">
                {swot.weaknesses.map((weak, i) => (
                  <li key={i} className="text-sm text-secondary-foreground flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span> {weak}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
