import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { generateDocument, analyzeDocument, rewriteDocument } from '../services/geminiService';
import { downloadDocx, downloadPdf, downloadXlsx } from '../utils/fileGenerator';
import type { DocumentType, HistoryItem, AnalysisType, RewriteType } from '../types';
import { LANGUAGES, TONES, FONT_FAMILIES, FONT_SIZES, REWRITE_OPTIONS } from '../constants';
import { LoadingSkeleton } from './LoadingSkeleton';
import { FileTextIcon } from './icons/FileTextIcon';
import { WordIcon } from './icons/WordIcon';
import { ExcelIcon } from './icons/ExcelIcon';
import { PdfIcon } from './icons/PdfIcon';
import { HistoryIcon } from './icons/HistoryIcon';
import { TrashIcon } from './icons/TrashIcon';
import { DocxPreview } from './DocxPreview';
import { AnalyzeIcon } from './icons/AnalyzeIcon';
import { SummarizeIcon } from './icons/SummarizeIcon';
import { ClarityIcon } from './icons/ClarityIcon';
import { ImprovementsIcon } from './icons/ImprovementsIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ImageIcon } from './icons/ImageIcon';
import { RewriteIcon } from './icons/RewriteIcon';

interface DocumentEditorProps {
    initialPrompt: string;
    onBack: () => void;
}

const OutputPlaceholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-8">
        <FileTextIcon className="w-16 h-16 mb-4 text-gray-700" />
        <h3 className="text-xl font-semibold text-gray-300">Your document will appear here</h3>
        <p className="mt-2 max-w-sm text-gray-400">
            Just type your request, select an output format, and hit 'Generate' to see the magic happen.
        </p>
    </div>
);

const JsonTablePreview: React.FC<{ jsonContent: string }> = ({ jsonContent }) => {
    try {
        const cleanedJson = jsonContent.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(cleanedJson);

        if (!Array.isArray(data) || data.length === 0) {
            return <p className="text-gray-400 p-4">No data to display. The generated content might be empty or in an incorrect format.</p>;
        }

        const headers = Object.keys(data[0]);
        
        return (
            <div className="overflow-x-auto rounded-lg border border-gray-700">
                <table className="min-w-full divide-y divide-gray-700 text-sm">
                    <thead className="bg-gray-900/50">
                        <tr>
                            {headers.map((header) => (
                                <th key={header} scope="col" className="px-4 py-3 text-left text-xs font-bold text-cyan-300 uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="odd:bg-gray-800/50 even:bg-gray-900/30 hover:bg-cyan-900/20 transition-colors">
                                {headers.map((header, colIndex) => (
                                    <td key={`${rowIndex}-${colIndex}`} className="px-4 py-3 whitespace-nowrap text-gray-300">
                                        {String(row[header])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } catch (e) {
        console.error("Failed to parse JSON for table preview:", e);
        return (
            <div className="prose prose-invert max-w-none p-4 bg-red-900/50 text-red-300 rounded-md border border-red-700 whitespace-pre-wrap">
                <p className="font-semibold mb-2">Could not display table preview. Showing raw content:</p>
                {jsonContent}
            </div>
        );
    }
};

export const DocumentEditor: React.FC<DocumentEditorProps> = ({ initialPrompt, onBack }) => {
    const [prompt, setPrompt] = useState<string>(initialPrompt);
    const [documentType, setDocumentType] = useState<DocumentType>('text');
    const [language, setLanguage] = useState<string>(LANGUAGES[0].name);
    const [tone, setTone] = useState<string>(TONES[0]);
    const [generatedContent, setGeneratedContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    
    const [activeTab, setActiveTab] = useState<'document' | 'history' | 'analyze' | 'rewrite'>('document');

    // Customization State
    const [headerText, setHeaderText] = useState<string>('');
    const [footerText, setFooterText] = useState<string>('');
    const [artwork, setArtwork] = useState<string | null>(null); // base64 data URL
    const [isCustomizeOpen, setIsCustomizeOpen] = useState<boolean>(false);
    const [fontFamily, setFontFamily] = useState<string>(FONT_FAMILIES[0]);
    const [fontSize, setFontSize] = useState<number>(FONT_SIZES[2]); // Default 12pt

    // Analysis State
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [analysisResult, setAnalysisResult] = useState<string>('');
    const [analysisError, setAnalysisError] = useState<string | null>(null);
    const [currentAnalysisType, setCurrentAnalysisType] = useState<AnalysisType | null>(null);

    // Rewrite State
    const [isRewriting, setIsRewriting] = useState<boolean>(false);
    const [rewriteResult, setRewriteResult] = useState<string>('');
    const [rewriteError, setRewriteError] = useState<string | null>(null);
    const [currentRewriteType, setCurrentRewriteType] = useState<RewriteType | null>(null);

    const MAX_HISTORY_ITEMS = 20;

    const wordCount = useMemo(() => prompt.trim().split(/\s+/).filter(Boolean).length, [prompt]);

    useEffect(() => {
        try {
            const savedHistory = localStorage.getItem('documentHistory');
            if (savedHistory) {
                setHistory(JSON.parse(savedHistory));
            }
        } catch (error) {
            console.error("Could not load document history from localStorage", error);
            localStorage.removeItem('documentHistory');
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('documentHistory', JSON.stringify(history));
        } catch (error) {
            console.error("Could not save document history to localStorage", error);
        }
    }, [history]);
    
    const handleArtworkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert('File is too large. Please upload an image under 2MB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setArtwork(reader.result as string);
            };
            reader.onerror = () => {
                setError('Failed to read the image file.');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = useCallback(async () => {
        if (!prompt.trim()) {
            setError('Please enter a description of the document you want to create.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedContent('');
        setAnalysisResult('');
        setAnalysisError(null);
        setCurrentAnalysisType(null);
        setRewriteResult('');
        setRewriteError(null);
        setCurrentRewriteType(null);
        setActiveTab('document');

        try {
            const content = await generateDocument(prompt, documentType, language, tone);
            
            const newHistoryItem: HistoryItem = {
                id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                content: content,
                documentType: documentType,
                timestamp: Date.now(),
                headerText,
                footerText,
                artwork: artwork ?? undefined,
                language,
                tone,
                fontFamily,
                fontSize,
            };

            setHistory(prevHistory => [newHistoryItem, ...prevHistory].slice(0, MAX_HISTORY_ITEMS));
            setGeneratedContent(content);

        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [prompt, documentType, language, tone, headerText, footerText, artwork, fontFamily, fontSize]);
    
    const handleAnalysisRequest = useCallback(async (type: AnalysisType) => {
        if (!generatedContent) return;
        
        setIsAnalyzing(true);
        setAnalysisResult('');
        setAnalysisError(null);
        setCurrentAnalysisType(type);

        try {
            const result = await analyzeDocument(generatedContent, type, language, tone);
            setAnalysisResult(result);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                setAnalysisError(err.message);
            } else {
                setAnalysisError('An unknown error occurred during analysis. Please try again.');
            }
        } finally {
            setIsAnalyzing(false);
        }
    }, [generatedContent, language, tone]);

     const handleRewriteRequest = useCallback(async (type: RewriteType) => {
        if (!generatedContent) return;
        
        setIsRewriting(true);
        setRewriteResult('');
        setRewriteError(null);
        setCurrentRewriteType(type);

        try {
            const result = await rewriteDocument(generatedContent, type, language, tone);
            setRewriteResult(result);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                setRewriteError(err.message);
            } else {
                setRewriteError('An unknown error occurred while rewriting the document. Please try again.');
            }
        } finally {
            setIsRewriting(false);
        }
    }, [generatedContent, language, tone]);

    const handleCopyToClipboard = (content: string) => {
        navigator.clipboard.writeText(content);
        alert('Copied to clipboard!');
    };

    const handleDownloadDocx = () => {
        downloadDocx(generatedContent, { headerText, footerText, artwork: artwork || undefined, fontFamily, fontSize });
    };

    const handleDownloadPdf = () => {
        downloadPdf(generatedContent, { headerText, footerText, artwork: artwork || undefined, fontFamily, fontSize });
    };

    const handleDownloadXlsx = () => {
        try {
            downloadXlsx(generatedContent);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred while creating the Excel file.");
            }
        }
    };
    
    const handleRestoreVersion = (item: HistoryItem) => {
        setGeneratedContent(item.content);
        setDocumentType(item.documentType);
        setHeaderText(item.headerText || '');
        setFooterText(item.footerText || '');
        setArtwork(item.artwork || null);
        setLanguage(item.language || LANGUAGES[0].name);
        setTone(item.tone || TONES[0]);
        setFontFamily(item.fontFamily || FONT_FAMILIES[0]);
        setFontSize(item.fontSize || FONT_SIZES[2]);
        setActiveTab('document');
    };

    const handleClearHistory = () => {
        if (window.confirm('Are you sure you want to clear the entire document history? This cannot be undone.')) {
            setHistory([]);
            localStorage.removeItem('documentHistory');
        }
    };
    
    const showCustomizationOptions = documentType === 'docx' || documentType === 'pdf';

    const formatOptions = useMemo(() => [
        { id: 'text', name: 'Plain Text', icon: FileTextIcon },
        { id: 'docx', name: 'Word (.docx)', icon: WordIcon },
        { id: 'pdf', name: 'PDF (.pdf)', icon: PdfIcon },
        { id: 'xlsx', name: 'Excel (.xlsx)', icon: ExcelIcon },
    ], []);

    const analysisOptions: { id: AnalysisType; name: string; icon: React.FC<{className?: string}> }[] = [
        { id: 'summary', name: 'Summarize', icon: SummarizeIcon },
        { id: 'clarity', name: 'Check Clarity', icon: ClarityIcon },
        { id: 'improvements', name: 'Suggest Improvements', icon: ImprovementsIcon },
    ];

    const actionButtonClass = "flex items-center space-x-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors px-3 py-1 rounded-md hover:bg-cyan-900/50";

    const selectClass = "mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-900 border-gray-600 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md text-white";

    const getTabTitle = () => {
        switch(activeTab) {
            case 'document': return 'Generated Document';
            case 'history': return 'Version History';
            case 'analyze': return 'Document Analysis';
            case 'rewrite': return 'Rewrite Document';
            default: return 'Output';
        }
    }

    return (
        <div className="bg-gray-900">
            <div className="container mx-auto px-6 py-12">
                 <div className="max-w-7xl mx-auto">
                    <button onClick={onBack} className="mb-8 text-cyan-400 hover:text-cyan-300 font-medium transition-colors flex items-center group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Back to Home
                    </button>

                    <div className="text-center mb-12">
                         <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Document Generator</h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                            Describe the document you need, and our AI will craft it for you in seconds. Be as specific as you can for the best results.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16">
                        {/* Left Column: Controls */}
                        <div className="flex flex-col space-y-8 bg-gray-800/50 border border-gray-700 p-8 rounded-xl shadow-2xl">
                             {error && (
                                <div className="bg-red-900/50 border-l-4 border-red-500 text-red-300 p-4 rounded-md" role="alert">
                                    <p className="font-bold">Error</p>
                                    <p>{error}</p>
                                </div>
                            )}

                            <div>
                                <label htmlFor="prompt-input" className="text-lg font-semibold text-gray-100">
                                    1. Describe your document
                                </label>
                                <div className="relative">
                                    <textarea
                                        id="prompt-input"
                                        rows={8}
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder={
                                            documentType === 'xlsx'
                                                ? "e.g., Create a table of Q3 sales data for a software company. Include columns for Product Name, Region, Units Sold, and Total Revenue. Generate 10 rows of sample data."
                                                : "e.g., A professional resignation letter for a software engineer with a two-week notice..."
                                        }
                                        className="mt-2 w-full p-4 border rounded-lg focus:ring-2 focus:ring-cyan-500 transition-shadow text-base bg-gray-900 text-gray-200 border-gray-600 focus:border-cyan-500 placeholder-gray-500"
                                    />
                                     <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-mono bg-gray-700/50 px-2 py-1 rounded">
                                        {wordCount} {wordCount === 1 ? 'word' : 'words'}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-gray-100">2. Set Language & Tone</h2>
                                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="language-select" className="block text-sm font-medium text-gray-300">Language</label>
                                        <select id="language-select" value={language} onChange={e => setLanguage(e.target.value)} className={selectClass}>
                                            {LANGUAGES.map(lang => <option key={lang.name} value={lang.name}>{lang.name}</option>)}
                                        </select>
                                    </div>
                                     <div>
                                        <label htmlFor="tone-select" className="block text-sm font-medium text-gray-300">Tone</label>
                                        <select id="tone-select" value={tone} onChange={e => setTone(e.target.value)} className={selectClass}>
                                            {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-lg font-semibold text-gray-100 mb-2">3. Choose your format</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {formatOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => setDocumentType(option.id as DocumentType)}
                                            className={`flex flex-col items-center justify-center p-4 text-center rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
                                                documentType === option.id
                                                    ? 'bg-cyan-900/30 border-cyan-500 text-cyan-300 shadow-lg shadow-cyan-500/10'
                                                    : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-cyan-600 hover:text-cyan-400'
                                            }`}
                                        >
                                            <option.icon className="w-8 h-8 mb-2" />
                                            <span className="font-semibold text-sm">{option.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                             {/* Customization Section */}
                            <div>
                                <button
                                    onClick={() => setIsCustomizeOpen(!isCustomizeOpen)}
                                    className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-100"
                                >
                                    4. Customize Document (Optional)
                                    <ChevronDownIcon className={`w-5 h-5 transition-transform text-gray-400 ${isCustomizeOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isCustomizeOpen && (
                                    <div className={`mt-4 space-y-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700 ${!showCustomizationOptions ? 'opacity-50' : ''}`}>
                                         {!showCustomizationOptions && (
                                            <p className="text-sm text-gray-500 italic">Customization is only available for Word (.docx) and PDF (.pdf) formats.</p>
                                        )}
                                        <fieldset disabled={!showCustomizationOptions} className="space-y-4">
                                            <div>
                                                <label htmlFor="header-text" className="block text-sm font-medium text-gray-300">Header Text</label>
                                                <input
                                                    type="text"
                                                    id="header-text"
                                                    value={headerText}
                                                    onChange={(e) => setHeaderText(e.target.value)}
                                                    className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm text-white"
                                                    placeholder="e.g., Company Name - Confidential"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="footer-text" className="block text-sm font-medium text-gray-300">Footer Text</label>
                                                <input
                                                    type="text"
                                                    id="footer-text"
                                                    value={footerText}
                                                    onChange={(e) => setFooterText(e.target.value)}
                                                    className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm text-white"
                                                    placeholder="e.g., Page Number - Report Title"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Artwork (Logo)</label>
                                                <div className="mt-1 flex items-center space-x-4">
                                                    {artwork && <img src={artwork} alt="Artwork preview" className="h-12 w-auto border p-1 rounded-md bg-white"/>}
                                                    <label htmlFor="artwork-upload" className="cursor-pointer bg-gray-700 hover:bg-gray-600 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 flex items-center">
                                                        <ImageIcon className="w-5 h-5 mr-2 text-gray-400" />
                                                        {artwork ? 'Change Image' : 'Upload Image'}
                                                    </label>
                                                    <input id="artwork-upload" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={handleArtworkUpload} />
                                                    {artwork && <button onClick={() => setArtwork(null)} className="text-sm text-red-400 hover:text-red-300">Remove</button>}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                                                <div>
                                                    <label htmlFor="font-family" className="block text-sm font-medium text-gray-300">Font Family</label>
                                                    <select id="font-family" value={fontFamily} onChange={e => setFontFamily(e.target.value)} className={selectClass}>
                                                        {FONT_FAMILIES.map(font => <option key={font} value={font}>{font}</option>)}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label htmlFor="font-size" className="block text-sm font-medium text-gray-300">Font Size</label>
                                                    <select id="font-size" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className={selectClass}>
                                                        {FONT_SIZES.map(size => <option key={size} value={size}>{size} pt</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                )}
                            </div>


                            <div>
                                <button
                                    onClick={handleGenerate}
                                    disabled={isLoading}
                                    className="w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-md shadow-lg shadow-cyan-500/20 text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-cyan-800 disabled:shadow-none disabled:cursor-not-allowed transition-all transform hover:scale-105"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Generating...
                                        </>
                                    ) : (
                                        '✨ Generate Document'
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Output */}
                        <div className="relative lg:sticky top-24 h-[80vh] mt-12 lg:mt-0">
                           <div className="bg-gray-800/50 h-full w-full rounded-xl border border-gray-700 shadow-inner flex flex-col">
                                {/* Header with Tabs */}
                                <div className="p-4 border-b border-gray-700 bg-gray-900/50 rounded-t-xl flex-shrink-0">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-bold text-white">{getTabTitle()}</h2>
                                        {activeTab === 'history' && history.length > 0 && (
                                            <button onClick={handleClearHistory} className="flex items-center text-sm font-medium text-red-400 hover:text-red-300 transition-colors">
                                                <TrashIcon className="w-4 h-4 mr-1" />
                                                Clear History
                                            </button>
                                        )}
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex border-b border-gray-700">
                                            <button
                                                onClick={() => setActiveTab('document')}
                                                className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'document' ? 'text-cyan-400 border-cyan-400' : 'text-gray-400 hover:text-white border-transparent'}`}
                                            >
                                                Document
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('history')}
                                                className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold transition-colors flex items-center ${activeTab === 'history' ? 'text-cyan-400 border-cyan-400' : 'text-gray-400 hover:text-white border-transparent'}`}
                                            >
                                                History
                                                {history.length > 0 && <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-900/50 text-cyan-300 text-xs font-bold">{history.length}</span>}
                                            </button>
                                            {generatedContent && (
                                                <>
                                                    <button
                                                        onClick={() => setActiveTab('analyze')}
                                                        className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold transition-colors flex items-center ${activeTab === 'analyze' ? 'text-cyan-400 border-cyan-400' : 'text-gray-400 hover:text-white border-transparent'}`}
                                                    >
                                                        Analyze
                                                    </button>
                                                    <button
                                                        onClick={() => setActiveTab('rewrite')}
                                                        className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold transition-colors flex items-center ${activeTab === 'rewrite' ? 'text-cyan-400 border-cyan-400' : 'text-gray-400 hover:text-white border-transparent'}`}
                                                    >
                                                        Rewrite
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="overflow-y-auto flex-grow relative bg-gray-800/30 rounded-b-xl">
                                    {activeTab === 'document' ? (
                                        <>
                                            {isLoading ? (
                                                <div className="p-8"><LoadingSkeleton /></div>
                                            ) : !generatedContent ? (
                                                <OutputPlaceholder />
                                            ) : (
                                                <div>
                                                    <div className="sticky top-0 bg-gray-800/80 backdrop-blur-sm z-10 flex justify-end p-2 border-b border-gray-700 space-x-2">
                                                        {documentType === 'text' && ( <button onClick={() => handleCopyToClipboard(generatedContent)} className={actionButtonClass}><ClipboardIcon className="w-4 h-4" /><span>Copy</span></button> )}
                                                        {documentType === 'docx' && ( <button onClick={handleDownloadDocx} className={actionButtonClass}><DownloadIcon className="w-4 h-4" /><span>Download .docx</span></button> )}
                                                        {documentType === 'pdf' && ( <button onClick={handleDownloadPdf} className={actionButtonClass}><DownloadIcon className="w-4 h-4" /><span>Download .pdf</span></button> )}
                                                        {documentType === 'xlsx' && ( <button onClick={handleDownloadXlsx} className={actionButtonClass}><DownloadIcon className="w-4 h-4" /><span>Download .xlsx</span></button> )}
                                                    </div>
                                                    <div className="p-6">
                                                        {documentType === 'xlsx' ? (
                                                            <JsonTablePreview jsonContent={generatedContent} />
                                                        ) : documentType === 'docx' || documentType === 'pdf' ? (
                                                            <DocxPreview content={generatedContent} />
                                                        ) : (
                                                            <div className="prose prose-invert max-w-none whitespace-pre-wrap">{generatedContent}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : activeTab === 'history' ? (
                                        <>
                                            {history.length === 0 ? (
                                                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-8">
                                                    <HistoryIcon className="w-16 h-16 mb-4 text-gray-700" />
                                                    <h3 className="text-xl font-semibold text-gray-300">No history yet</h3>
                                                    <p className="mt-2 max-w-sm text-gray-400">Generated documents will appear here.</p>
                                                </div>
                                            ) : (
                                                <ul className="p-2 space-y-2">
                                                    {history.map(item => (
                                                        <li key={item.id} className="p-4 bg-gray-900/40 hover:bg-gray-900/60 transition-colors group rounded-lg">
                                                            <div className="flex justify-between items-start">
                                                                <div className="w-full mr-4 overflow-hidden">
                                                                    <p className="text-sm font-semibold text-gray-200">
                                                                        Generated at {new Date(item.timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                                                        <span className="ml-2 text-xs font-normal text-gray-400">{new Date(item.timestamp).toLocaleDateString()}</span>
                                                                    </p>
                                                                    <p className="mt-2 text-sm text-gray-300 line-clamp-2 pr-4">
                                                                        {item.documentType === 'xlsx'
                                                                            ? 'Excel Spreadsheet Data'
                                                                            : item.content
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <button
                                                                    onClick={() => handleRestoreVersion(item)}
                                                                    className="ml-auto whitespace-nowrap opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity bg-cyan-600 text-white hover:bg-cyan-700 text-sm font-semibold px-4 py-2 rounded-md"
                                                                >
                                                                    Restore
                                                                </button>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    ) : activeTab === 'analyze' ? (
                                        <div className="p-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                                                {analysisOptions.map(opt => (
                                                     <button 
                                                        key={opt.id}
                                                        onClick={() => handleAnalysisRequest(opt.id)}
                                                        disabled={isAnalyzing}
                                                        className={`flex items-center justify-center space-x-2 px-4 py-2 text-sm font-semibold rounded-md border transition-colors disabled:opacity-50 disabled:cursor-wait ${currentAnalysisType === opt.id && !isAnalyzing ? 'bg-cyan-900/50 border-cyan-700 text-cyan-300' : 'bg-gray-900/50 border-gray-700 hover:bg-gray-700'}`}
                                                    >
                                                        <opt.icon className="w-5 h-5" />
                                                        <span>{opt.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="min-h-[200px]">
                                                {isAnalyzing ? (
                                                    <LoadingSkeleton />
                                                ) : analysisError ? (
                                                    <div className="text-red-300 bg-red-900/50 p-4 rounded-md">{analysisError}</div>
                                                ) : analysisResult ? (
                                                    <div className="prose prose-invert max-w-none whitespace-pre-wrap">{analysisResult}</div>
                                                ) : (
                                                     <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 py-10">
                                                        <AnalyzeIcon className="w-16 h-16 mb-4 text-gray-700" />
                                                        <h3 className="text-xl font-semibold text-gray-300">Analyze your document</h3>
                                                        <p className="mt-2 max-w-sm text-gray-400">Select an analysis tool above to get started.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : ( // Rewrite Tab
                                         <div className="p-6">
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                                                {REWRITE_OPTIONS.map(opt => (
                                                     <button 
                                                        key={opt.id}
                                                        onClick={() => handleRewriteRequest(opt.id)}
                                                        disabled={isRewriting}
                                                        className={`flex items-center justify-center space-x-2 px-4 py-2 text-sm font-semibold rounded-md border transition-colors disabled:opacity-50 disabled:cursor-wait ${currentRewriteType === opt.id && !isRewriting ? 'bg-cyan-900/50 border-cyan-700 text-cyan-300' : 'bg-gray-900/50 border-gray-700 hover:bg-gray-700'}`}
                                                    >
                                                        <opt.icon className="w-5 h-5" />
                                                        <span>{opt.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="min-h-[200px]">
                                                {isRewriting ? (
                                                    <LoadingSkeleton />
                                                ) : rewriteError ? (
                                                    <div className="text-red-300 bg-red-900/50 p-4 rounded-md">{rewriteError}</div>
                                                ) : rewriteResult ? (
                                                    <div>
                                                        <div className="sticky top-0 bg-gray-800/80 backdrop-blur-sm z-10 flex justify-end p-2 border-y border-gray-700 space-x-2">
                                                            <button onClick={() => handleCopyToClipboard(rewriteResult)} className={actionButtonClass}><ClipboardIcon className="w-4 h-4" /><span>Copy Rewritten Text</span></button>
                                                        </div>
                                                        <div className="mt-4 prose prose-invert max-w-none whitespace-pre-wrap">{rewriteResult}</div>
                                                    </div>
                                                ) : (
                                                     <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 py-10">
                                                        <RewriteIcon className="w-16 h-16 mb-4 text-gray-700" />
                                                        <h3 className="text-xl font-semibold text-gray-300">Rewrite your document</h3>
                                                        <p className="mt-2 max-w-sm text-gray-400">Select a rewrite tool above to modify your generated document.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};