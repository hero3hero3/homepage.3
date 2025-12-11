export interface PricingPlan {
  duration: string;
  price: string;
  features: string[];
}

export interface TargetAudience {
  attribute: string;
  description: string;
}

export enum SectionId {
  HERO = 'hero',
  ABOUT = 'about',
  SERVICES = 'services',
  AI_TOOL = 'ai-tool',
  CONTACT = 'contact',
  LEGAL = 'legal'
}