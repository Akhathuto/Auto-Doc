
import type { Template, PricingPlan, Testimonial, FaqItem, RewriteOption } from './types';
import { DocumentIcon } from './components/icons/DocumentIcon';
import { WandIcon } from './components/icons/WandIcon';
import { DownloadIcon } from './components/icons/DownloadIcon';
import { AnalyzeIcon } from './components/icons/AnalyzeIcon';
import { HistoryIcon } from './components/icons/HistoryIcon';
import { SettingsIcon } from './components/icons/SettingsIcon';
import { LanguageIcon } from './components/icons/LanguageIcon';
import { ShortenIcon } from './components/icons/ShortenIcon';
import { LengthenIcon } from './components/icons/LengthenIcon';
import { FormalIcon } from './components/icons/FormalIcon';
import { SimplifyIcon } from './components/icons/SimplifyIcon';

export const SAMPLE_TEMPLATES: Template[] = [
    {
        title: 'Business Proposal',
        description: 'A persuasive proposal for your next big project.',
        icon: DocumentIcon,
        prompt: `Draft a comprehensive business proposal for "Aura Apparel," a new sustainable e-commerce fashion brand targeting millennials. The proposal is for a 3-month social media marketing campaign on Instagram and TikTok. It must include: an Executive Summary, clear campaign Objectives (e.g., increase followers by 15k, achieve 5% engagement rate), a detailed content Strategy (influencer collaborations, user-generated content contests), a project Timeline with milestones, a breakdown of the Budget (ad spend, influencer fees, content creation), and measurable KPIs to track ROI.`,
        preview: {
            type: 'text',
            content: 'Generate a comprehensive business proposal complete with sections for objectives, strategy, timeline, and budget analysis...'
        }
    },
    {
        title: 'Resume/CV',
        description: 'A professional resume that stands out to recruiters.',
        icon: DocumentIcon,
        prompt: `Create a professional, one-page resume for a Senior Software Engineer named "Jane Doe". She has 8 years of experience specializing in frontend development with React, TypeScript, and Next.js, and backend with Node.js and GraphQL. The resume should include: a concise professional summary, a skills section, professional experience with 3-4 bullet points per role highlighting quantifiable achievements (e.g., "Led a team of 4 engineers to rebuild the checkout process, resulting in a 20% increase in conversion rates" or "Improved application load time by 35% through code splitting and performance optimization techniques"), education, and links to her GitHub and LinkedIn profiles.`,
        preview: {
            type: 'text',
            content: 'Craft a professional resume for any role. Highlight your key skills, experience, and achievements to impress recruiters...'
        }
    },
    {
        title: 'Quarterly Sales Report',
        description: 'An Excel report to track and analyze sales data.',
        icon: DocumentIcon,
        prompt: `Generate a JSON array of objects representing a quarterly sales report for a fictional electronics company for Q3 2024. The data should include 15 rows of sample data. Each object must have the following keys: "ProductID" (e.g., "SKU-001"), "ProductName" (e.g., "Smartwatch Series X", "Wireless Earbuds Pro"), "Region" (one of "North America", "Europe", "Asia", "South America"), "UnitsSold" (a number between 500 and 10000), "AveragePrice" (a number in USD between 50 and 800), and "TotalRevenue" (calculated as UnitsSold * AveragePrice).`,
        preview: {
            type: 'table',
            content: ['Product', 'Region', 'Units Sold', 'Revenue']
        }
    },
     {
        title: 'Press Release',
        description: 'A professional press release to announce company news.',
        icon: DocumentIcon,
        prompt: `Write a professional press release for a tech startup "InnovateAI" announcing the launch of their new product, "Synapse," a productivity app that uses AI to organize and summarize daily tasks. The release should be for immediate distribution. Include: a compelling headline, a dateline (City, State – Date), an introduction (the 5 Ws), a body with more details and a quote from the CEO, "Alex Chen," about the product's vision, an "About InnovateAI" section, and media contact information.`,
        preview: {
            type: 'text',
            content: 'FOR IMMEDIATE RELEASE\n\nInnovateAI Launches "Synapse," a Groundbreaking AI-Powered Productivity App...'
        }
    },
    {
        title: 'Meeting Minutes',
        description: 'A clear summary of meeting discussions and action items.',
        icon: DocumentIcon,
        prompt: `Generate formal meeting minutes for a project kick-off meeting for the "Website Redesign Project". The meeting was held on today's date.
The minutes should include the following sections:
- **Meeting Details**: Project Name, Date, Time, Location (Virtual).
- **Attendees**: John Smith (Project Manager), Sarah Lee (Lead Designer), Mike Chen (Lead Developer), Emily White (Marketing).
- **Agenda Items**: Project Goals & Scope, Timeline Review, Role Assignments, Next Steps.
- **Key Discussion Points**: Summarize the discussion for each agenda item.
- **Decisions Made**: Note any key decisions, such as "The team agreed on using a WordPress CMS."
- **Action Items**: Create a table with columns for "Task", "Assigned To", and "Due Date". Include at least three action items.`,
        preview: {
            type: 'text',
            content: 'Date: [Date]\nAttendees: [Name], [Name]...\n\nAgenda:\n1. Project Goals\n2. Timelines\n\nAction Items:\n- [Owner]: Complete task by [Date]'
        }
    },
    {
        title: 'Cover Letter',
        description: 'A tailored cover letter to accompany your resume.',
        icon: DocumentIcon,
        prompt: `Write a compelling and professional cover letter for a "Marketing Manager" position at a company called "Creative Solutions Inc.". The applicant, "Sarah Johnson," has 5 years of experience in digital marketing, specializing in SEO and content strategy. The letter should be addressed to the hiring manager, "Mr. David Lee." It needs to express enthusiasm for the role, highlight relevant skills and a key achievement (e.g., "increased organic traffic by 40%"), and clearly state the applicant's interest in an interview.`,
        preview: {
            type: 'text',
            content: 'Dear Mr. Lee,\n\nI am writing to express my keen interest in the Marketing Manager position at Creative Solutions Inc. With over five years of experience in digital marketing...'
        }
    },
    {
        title: 'Job Offer Letter',
        description: 'A formal job offer letter for a new employee.',
        icon: DocumentIcon,
        prompt: `Generate a formal job offer letter for the position of "Senior Marketing Analyst" to candidate "Alex Rivera". The letter should be from "Jane Miller, HR Director" at "Innovate Corp.". Key details to include are: start date of [Start Date], annual salary of $85,000, a reporting manager of "David Chen", and a brief outline of benefits (health insurance, 401(k) matching, 3 weeks paid vacation). The letter should request a signed acceptance by [Acceptance Date].`,
        preview: {
            type: 'text',
            content: 'Dear Alex Rivera,\n\nOn behalf of Innovate Corp., I am delighted to offer you the position of Senior Marketing Analyst...'
        }
    },
    {
        title: 'Employee Performance Review',
        description: 'A structured template for conducting employee reviews.',
        icon: DocumentIcon,
        prompt: `Create a performance review document for an employee named "Emily Carter," a "Graphic Designer." The review period is for "H2 2024." The document should include sections for: Key Accomplishments (provide 3 example bullet points), Areas for Improvement (provide 2 example bullet points), Employee Goals for the Next Period (provide 2 example goals), and a section for both Manager's and Employee's comments. The tone should be constructive and professional.`,
        preview: {
            type: 'text',
            content: 'Employee Name: Emily Carter\nReview Period: H2 2024\n\nKey Accomplishments:\n- ...\n\nAreas for Improvement:\n- ...'
        }
    },
    {
        title: 'Social Media Calendar',
        description: 'Plan your social media content with this Excel template.',
        icon: DocumentIcon,
        prompt: `Generate a JSON array of objects for a one-week social media content calendar for a coffee shop. Create 7 entries, one for each day. Each object must have the following keys: "Day" (e.g., "Monday"), "Platform" (one of "Instagram", "Facebook", "Twitter"), "ContentIdea" (e.g., "Photo of our new seasonal latte", "Poll: What's your favorite coffee bean?"), "Hashtags" (e.g., "#CoffeeLovers #LocalBrew"), and "PostTime" (e.g., "9:00 AM").`,
        preview: {
            type: 'table',
            content: ['Day', 'Platform', 'Content Idea', 'Hashtags']
        }
    },
    {
        title: 'Email Newsletter',
        description: 'An engaging newsletter to send to your subscribers.',
        icon: DocumentIcon,
        prompt: `Write an email newsletter for a monthly SaaS product update. The company is "CodeSphere" and the product helps developers. The newsletter should have a catchy subject line, a brief introduction, a "What's New" section detailing 2-3 new features with brief descriptions, a "Tip of the Month" section, and a clear call-to-action at the end to "Log in and try the new features." The tone should be informative and slightly casual.`,
        preview: {
            type: 'text',
            content: 'Subject: New Features to Boost Your Workflow!\n\nHi [Name],\n\nThis month at CodeSphere, we\'ve been busy shipping updates to make your life easier...'
        }
    },
    {
        title: 'Invoice Template',
        description: 'A professional invoice for billing clients.',
        icon: DocumentIcon,
        prompt: `Generate the content for a freelance service invoice. It should include placeholders for: [Your Company Name/Your Name], [Your Address], [Client Company Name], [Client Address]. It must have an Invoice Number, Invoice Date, and Due Date. Create a table of services with columns for "Description", "Quantity", "Unit Price", and "Total". Include two sample items (e.g., "Website Design Services", "Content Management System Setup"). Finally, add a "Subtotal", "Tax (10%)", and "Total Amount Due" section, along with payment instructions.`,
        preview: {
            type: 'text',
            content: 'INVOICE\n\nFrom: [Your Company Name]\nTo: [Client Company Name]\n\nInvoice #: 12345\nDate: ...\n\nDescription | Quantity | Price | Total\n...'
        }
    },
    {
        title: 'Expense Report',
        description: 'Track business expenses with this Excel report.',
        icon: DocumentIcon,
        prompt: `Generate a JSON array of objects for a business trip expense report. Create 10 sample expense entries. Each object must have keys for "Date" (in YYYY-MM-DD format), "Category" (one of "Travel", "Meals", "Accommodation", "Client Entertainment"), "Description" (e.g., "Flight to New York", "Dinner with Acme Corp team"), and "Amount" (a number in USD between 20 and 500).`,
        preview: {
            type: 'table',
            content: ['Date', 'Category', 'Description', 'Amount']
        }
    },
    {
        title: 'Non-Disclosure Agreement (NDA)',
        description: 'A standard confidentiality agreement.',
        icon: DocumentIcon,
        prompt: `Generate a simple, standard Non-Disclosure Agreement (NDA). The document should be a mutual NDA between two parties, "[Party A]" and "[Party B]". It must define "Confidential Information", outline the obligations of the receiving party, specify exclusions from confidential information (e.g., publicly known information), state the term of the agreement, and include sections for governing law and signatures. The language should be formal and legalistic.`,
        preview: {
            type: 'text',
            content: 'This Non-Disclosure Agreement (the "Agreement") is entered into between [Party A] and [Party B]...\n\n1. Definition of Confidential Information...\n2. Obligations...'
        }
    },
    {
        title: 'Blog Post Outline',
        description: 'Structure your next blog post for maximum impact.',
        icon: DocumentIcon,
        prompt: `Create a detailed blog post outline for the topic "10 Tips for Effective Time Management for Remote Workers." The outline should include: a catchy Title suggestion, a short Introduction (hook and thesis), 10 main section headings (one for each tip), and a Conclusion that summarizes the key points and provides a call-to-action.`,
        preview: {
            type: 'text',
            content: 'Title: Master Your Day: 10 Time Management Tips for Remote Workers\n\nI. Introduction\n   - Hook: The challenge of staying productive at home.\n   - Thesis: These 10 tips will help you reclaim your focus.\n\nII. Tip 1: Create a Dedicated Workspace...'
        }
    },
    {
        title: 'Creative Brief',
        description: 'Outline the requirements for a creative project.',
        icon: DocumentIcon,
        prompt: `Generate a comprehensive creative brief for a new logo design project for a brand named "Zenith Matcha". The brief should include the following sections: Project Background (briefly describe the company), Project Objectives (what the new logo should achieve), Target Audience (describe the ideal customer), Key Message (the single most important thing to communicate), Competitors (list 2-3 competitors), Tone & Style (e.g., "minimal, modern, organic"), and Deliverables (e.g., "Primary logo, color palette, font selection").`,
        preview: {
            type: 'text',
            content: 'Project: Zenith Matcha Logo Design\n\n1. Background:\n   - Zenith Matcha is a new D2C brand...\n\n2. Objectives:\n   - Create a memorable and modern brand identity...'
        }
    },
    {
        title: 'Video Script Outline',
        description: 'A structured outline for a marketing or educational video.',
        icon: DocumentIcon,
        prompt: `Create a script outline for a 2-minute marketing video for a new mobile app called "BudgetBee" that helps users track their spending. The script should be structured in three columns: "Time", "Visual", and "Audio (Spoken/Sound)". The outline should include: a Hook (0-10s), the Problem (10-30s), the Solution (BudgetBee app) (30-90s), a Call to Action (90-110s), and an Outro with branding (110-120s).`,
        preview: {
            type: 'text',
            content: 'Time | Visual | Audio\n------------------------------------------------\n0-10s | Fast-paced montage of people looking stressed about bills. | Upbeat music starts. VO: "Feeling overwhelmed by your finances?"\n...'
        }
    }
];

export const PRICING_PLANS: PricingPlan[] = [
    {
        name: 'Starter',
        price: '$19',
        description: 'For individuals and small teams getting started.',
        features: [
            '10 documents per month',
            'Access to all templates',
            'Standard AI model',
            'Email support'
        ],
        isPopular: false
    },
    {
        name: 'Pro',
        price: '$49',
        description: 'For professionals who need more power and features.',
        features: [
            'Unlimited documents',
            'Access to all templates',
            'Advanced AI model',
            'Priority email support',
            'Document analysis'
        ],
        isPopular: true
    },
    {
        name: 'Enterprise',
        price: 'Contact Us',
        description: 'For large organizations with custom needs.',
        features: [
            'Everything in Pro',
            'Team collaboration features',
            'Custom integrations',
            'Dedicated account manager'
        ],
        isPopular: false
    }
];

export const LANGUAGES = [
    { name: 'English' },
    { name: 'Spanish' },
    { name: 'French' },
    { name: 'German' },
    { name: 'Italian' },
    { name: 'Portuguese' },
    { name: 'Dutch' },
    { name: 'Russian' },
    { name: 'Japanese' },
    { name: 'Chinese' },
    { name: 'Korean' },
];

export const TONES = [
    'Professional',
    'Casual',
    'Persuasive',
    'Academic',
    'Creative',
    'Technical',
    'Formal',
    'Friendly'
];

export const FONT_FAMILIES = [
    'Calibri',
    'Arial',
    'Times New Roman',
    'Courier New',
    'Georgia',
    'Verdana'
];

export const FONT_SIZES = [10, 11, 12, 14, 16, 18];

export const FEATURES = [
    {
        name: 'Powerful AI Generation',
        description: 'Leverage the cutting-edge Gemini model to generate high-quality, coherent, and contextually relevant documents for any purpose.',
        icon: WandIcon,
    },
    {
        name: 'Multi-Format Export',
        description: 'Export your generated documents to popular formats including PDF, Word (.docx), Excel (.xlsx), and plain text with a single click.',
        icon: DownloadIcon,
    },
    {
        name: 'AI-Powered Analysis',
        description: 'Go beyond generation. Summarize, check for clarity, and get actionable suggestions to improve your document\'s impact and readability.',
        icon: AnalyzeIcon,
    },
    {
        name: 'Version History',
        description: 'Never lose a great idea. Automatically save generated documents and easily view or revert to any previous version.',
        icon: HistoryIcon,
    },
    {
        name: 'Full Customization',
        description: 'Tailor your documents with custom headers, footers, logos, fonts, and more to match your brand and professional needs.',
        icon: SettingsIcon,
    },
    {
        name: 'Multiple Languages & Tones',
        description: 'Create documents in over 10 languages and set the perfect tone, from professional and academic to casual and creative.',
        icon: LanguageIcon,
    },
];

export const TESTIMONIALS: Testimonial[] = [
    {
        quote: 'This tool has completely transformed my workflow. I can now create high-quality reports and proposals in a fraction of the time. The AI analysis feature is a game-changer!',
        name: 'Sarah L.',
        title: 'Marketing Manager',
        avatar: 'https://i.pravatar.cc/150?u=sarah'
    },
    {
        quote: 'As a small business owner, I wear many hats. EdgTec Templates saves me hours of work every week. The templates are professional and the customization options are fantastic.',
        name: 'Michael B.',
        title: 'Founder, Creative Co.',
        avatar: 'https://i.pravatar.cc/150?u=michael'
    },
    {
        quote: 'I was skeptical about AI document generators, but this one exceeded all my expectations. The quality of the generated content is outstanding, and it understands complex requests perfectly.',
        name: 'Jessica T.',
        title: 'Freelance Consultant',
        avatar: 'https://i.pravatar.cc/150?u=jessica'
    }
];

export const FAQ_DATA: FaqItem[] = [
    {
        question: 'How does the AI document generation work?',
        answer: 'Our platform uses Google\'s advanced Gemini AI model. You provide a detailed description (a "prompt") of the document you need, and the AI analyzes your request to generate a structured, professional document that matches your specifications. The more detailed your prompt, the better the result.'
    },
    {
        question: 'Is my data secure?',
        answer: 'Yes, we take data security very seriously. Your document content is processed securely and is not used to train the AI models. We use industry-standard encryption to protect your data at all times.'
    },
    {
        question: 'What file formats can I export my documents to?',
        answer: 'You can export your documents to a variety of popular formats, including Plain Text (.txt), Microsoft Word (.docx), PDF (.pdf), and Microsoft Excel (.xlsx) for data-driven documents.'
    },
    {
        question: 'Can I customize the generated documents?',
        answer: 'Absolutely! For Word and PDF documents, you can add custom headers, footers, upload your own logo, and choose from a selection of professional fonts and sizes to match your branding.'
    },
    {
        question: 'What is the document history feature?',
        answer: 'Every time you generate a document, a version is automatically saved to your history. This allows you to view, compare, and revert to previous versions of your work, so you never lose a good draft.'
    }
];

export const REWRITE_OPTIONS: RewriteOption[] = [
    { id: 'shorten', name: 'Shorten', icon: ShortenIcon },
    { id: 'lengthen', name: 'Lengthen', icon: LengthenIcon },
    { id: 'formal', name: 'Make More Formal', icon: FormalIcon },
    { id: 'simplify', name: 'Simplify', icon: SimplifyIcon },
];
