import React from 'react';

export const PdfIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 14.5v-3h1a1 1 0 011 1v1a1 1 0 01-1 1h-1z M12.5 14.5v-3h1a1.5 1.5 0 010 3h-1z M15.5 14.5v-3h1.5m-1.5 1.5h1" />
    </svg>
);