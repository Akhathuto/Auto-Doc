
import React from 'react';
import { DocumentIcon } from './icons/DocumentIcon';

export const Footer: React.FC = () => {
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        alert('This page is not yet available.');
    };

    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <DocumentIcon className="h-7 w-7 text-cyan-400" />
                        <span className="text-xl font-bold text-white">Auto Doc</span>
                    </div>
                    <div className="flex space-x-6 text-gray-400">
                        <a href="#!" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors">About</a>
                        <a href="#!" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors">Contact</a>
                        <a href="#!" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
                        <a href="#!" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors">Terms of Service</a>
                    </div>
                </div>
                <div className="mt-8 text-center text-gray-500">
                    &copy; {new Date().getFullYear()} Auto Doc. All rights reserved.
                </div>
            </div>
        </footer>
    );
};