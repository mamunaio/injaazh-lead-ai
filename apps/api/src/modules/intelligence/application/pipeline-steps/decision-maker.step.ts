import { Injectable } from '@nestjs/common';
import { IIntelligenceStep } from '../../domain/interfaces/intelligence-step.interface';
import { IntelligenceContext } from '../../domain/entities/intelligence-context.entity';

@Injectable()
export class DecisionMakerIdentificationStep implements IIntelligenceStep {
  async process(context: IntelligenceContext): Promise<IntelligenceContext> {
    if (context.isFailed()) return context;

    const rawLead = context.rawLead || {};
    const aiOutreach = context.rawEnrichmentData?.aiOutreach || {};
    
    // Combine emails from original lead and enriched profile
    const leadEmail = rawLead.email ? [rawLead.email] : [];
    const enrichedEmails = aiOutreach.contact?.emails || [];
    const allEmails = Array.from(new Set([...leadEmail, ...enrichedEmails]));

    // Find linkedIn url from social links
    const socials = aiOutreach.contact?.socials || [];
    const linkedInUrl = socials.find((link: string) => link.includes('linkedin.com/in/')) || null;

    context.prospectIntelligence.decisionMaker = {
      name: rawLead.firstName ? `${rawLead.firstName} ${rawLead.lastName || ''}`.trim() : null,
      title: rawLead.title || null,
      emails: allEmails,
      linkedInUrl,
    };

    return context;
  }
}
