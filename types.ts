

{/* FIX: Converted TemplatePreview to a discriminated union for better type inference. */}
export type TemplatePreview =
  | {
      type: 'text';
      content: string;
    }
  | {
      type: 'table';
      content: string[];
    };

export interface Template {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    prompt: string;
    preview: TemplatePreview;
}

export interface PricingPlan {
    name: string;
    price: string;
    description: string;
    features: string[];
    isPopular: boolean;
}

export interface Testimonial {
    quote: string;
    name: string;
    title: string;
    avatar: string;
}

export interface FaqItem {
    question: string;
    answer: string;
}

export type DocumentType = 'text' | 'docx' | 'xlsx' | 'pdf';

export interface HistoryItem {
    id: string;
    content: string;
    documentType: DocumentType;
    timestamp: number;
    headerText?: string;
    footerText?: string;
    artwork?: string; // base64 data URL
    language?: string;
    tone?: string;
    fontFamily?: string;
    fontSize?: number;
}

export type AnalysisType = 'summary' | 'clarity' | 'improvements';
export type RewriteType = 'shorten' | 'lengthen' | 'formal' | 'simplify';

export interface RewriteOption {
    id: RewriteType;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
}