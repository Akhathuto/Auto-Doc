
import React from 'react';

interface DocxPreviewProps {
    content: string;
}

export const DocxPreview: React.FC<DocxPreviewProps> = ({ content }) => {
    return (
        <div 
            className="bg-white rounded-lg shadow-[0_0_30px_rgba(0,255,255,0.1)] max-w-3xl mx-auto ring-1 ring-gray-700 transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(0,255,255,0.2)]"
            aria-label="Document Preview"
        >
            <div className="p-8 sm:p-12">
                <div className="prose prose-primary max-w-none whitespace-pre-wrap font-serif text-black">
                    {content}
                </div>
            </div>
        </div>
    );
};