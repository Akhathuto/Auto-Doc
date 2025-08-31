import { GoogleGenAI } from "@google/genai";
import type { DocumentType, AnalysisType, RewriteType } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const DOC_CREATOR_INSTRUCTION = "You are an expert document creator. Based on the user's request, generate a high-quality, professional document. The output should be well-formatted plain text. Use headings and paragraphs where appropriate.";
const SPREADSHEET_CREATOR_INSTRUCTION = "You are an expert data assistant. Based on the user's request, generate a JSON array of objects representing rows in a spreadsheet. The keys of the objects will be the column headers. Do NOT output any text, explanation, or markdown formatting before or after the JSON array. The entire response must be a single, valid JSON array.";

const MAX_RETRIES = 3;
const INITIAL_BACKOFF_MS = 2000; // Start with a 2-second wait

// Custom error for the UI to catch after all retries fail.
class RateLimitError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "RateLimitError";
    }
}

/**
 * Wraps the Gemini API call with a retry mechanism for rate limit errors.
 */
async function callGeminiWithRetry(
    request: Parameters<typeof ai.models.generateContent>[0]
): Promise<ReturnType<typeof ai.models.generateContent>> {
    let lastError: any = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            return await ai.models.generateContent(request);
        } catch (error: any) {
            lastError = error;
            // The Gemini SDK error for rate limiting contains "RESOURCE_EXHAUSTED".
            const isRateLimitError = JSON.stringify(error).includes('RESOURCE_EXHAUSTED');

            if (isRateLimitError) {
                if (attempt < MAX_RETRIES) {
                    const delay = INITIAL_BACKOFF_MS * Math.pow(2, attempt - 1);
                    console.warn(`Rate limit exceeded. Retrying in ${delay}ms... (Attempt ${attempt}/${MAX_RETRIES})`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            } else {
                // Not a retriable error, fail immediately.
                console.error("A non-retriable error occurred with the Gemini API:", error);
                throw error;
            }
        }
    }
    
    console.error("All retries failed for Gemini API call due to rate limiting.", lastError);
    throw new RateLimitError("The API rate limit was exceeded after multiple retries.");
}


export async function generateDocument(prompt: string, documentType: DocumentType, language: string, tone: string): Promise<string> {
    try {
        let systemInstruction = DOC_CREATOR_INSTRUCTION;
        let responseMimeType: 'text/plain' | 'application/json' = 'text/plain';
        let temperature = 0.7;

        if (documentType === 'xlsx') {
            systemInstruction = SPREADSHEET_CREATOR_INSTRUCTION;
            responseMimeType = 'application/json';
            temperature = 0.2; // Lower temperature for more predictable, structured data
        }
        
        const fullSystemInstruction = `${systemInstruction} The document must be written in ${language}. The tone of the document should be ${tone}.`;

        const request = {
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: fullSystemInstruction,
                temperature: temperature,
                topP: 0.95,
                responseMimeType: responseMimeType,
            },
        };
        
        const response = await callGeminiWithRetry(request);
        return response.text;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof RateLimitError) {
            throw new Error("Our servers are currently busy due to high demand. Please wait a moment and try again.");
        }
        if (error instanceof Error) {
            throw new Error(`Failed to generate document from Gemini API: ${error.message}`);
        }
        throw new Error("Failed to generate document from Gemini API due to an unknown error.");
    }
}

const getAnalysisInstruction = (analysisType: AnalysisType): string => {
    switch (analysisType) {
        case 'summary':
            return "You are an expert editor. Provide a concise summary of the following document. Use bullet points for key takeaways.";
        case 'clarity':
            return "You are an expert editor. Analyze the following document for clarity and readability. Identify confusing sentences, jargon, or complex language. Provide specific feedback and suggest simpler alternatives where possible.";
        case 'improvements':
            return "You are an expert editor. Review the following document and provide actionable suggestions for improvement. Focus on tone, structure, impact, and overall quality. Format your suggestions as a list.";
        default:
            return "Analyze the following document.";
    }
};


export async function analyzeDocument(content: string, analysisType: AnalysisType, language: string, tone: string): Promise<string> {
     try {
        let systemInstruction = getAnalysisInstruction(analysisType);
        systemInstruction += ` The analysis and any suggestions should be written in ${language} and maintain a ${tone} tone.`

        const request = {
            model: 'gemini-2.5-flash',
            contents: content,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.6,
                topP: 0.95,
            },
        };
        
        const response = await callGeminiWithRetry(request);
        return response.text;

    } catch (error) {
        console.error("Error calling Gemini API for analysis:", error);
        if (error instanceof RateLimitError) {
            throw new Error("Our servers are currently busy due to high demand. Please wait a moment and try again.");
        }
        if (error instanceof Error) {
            throw new Error(`Failed to analyze document: ${error.message}`);
        }
        throw new Error("Failed to analyze document due to an unknown error.");
    }
}

const getRewriteInstruction = (rewriteType: RewriteType): string => {
    switch (rewriteType) {
        case 'shorten':
            return "You are an expert editor. Rewrite the following document to be more concise and to the point. Remove any redundant words or sentences without losing the core meaning.";
        case 'lengthen':
            return "You are an expert editor. Rewrite the following document by expanding on the key points. Add more detail, examples, or explanations to make the content more comprehensive, while maintaining the original tone and intent.";
        case 'formal':
            return "You are an expert editor. Rewrite the following document using a more formal and professional tone. Replace casual language with professional vocabulary and ensure the sentence structure is appropriate for a business or academic context.";
        case 'simplify':
            return "You are an expert editor. Rewrite the following document to make it simpler and easier to understand. Use plain language, shorter sentences, and break down complex ideas. The goal is to make the content accessible to a broader audience.";
        default:
            return "Rewrite the following document.";
    }
};

export async function rewriteDocument(content: string, rewriteType: RewriteType, language: string, tone: string): Promise<string> {
    try {
        let systemInstruction = getRewriteInstruction(rewriteType);
        systemInstruction += ` The rewritten document must be in ${language} and maintain a ${tone} tone, unless the rewrite instruction specifically asks to change the tone.`

        const request = {
            model: 'gemini-2.5-flash',
            contents: content,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
                topP: 0.95,
            },
        };
        
        const response = await callGeminiWithRetry(request);
        return response.text;

    } catch (error) {
        console.error("Error calling Gemini API for rewrite:", error);
        if (error instanceof RateLimitError) {
            throw new Error("Our servers are currently busy due to high demand. Please wait a moment and try again.");
        }
        if (error instanceof Error) {
            throw new Error(`Failed to rewrite document: ${error.message}`);
        }
        throw new Error("Failed to rewrite document due to an unknown error.");
    }
}