import React from 'react';

export const LanguageIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m4.25 16a9.01 9.01 0 000-18H7.75M9 21V11A2 2 0 0111 9h4a2 2 0 012 2v10m-6 0h2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.01 9.01 0 008.66-8.66" />
    </svg>
);