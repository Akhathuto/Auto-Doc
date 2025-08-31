
import React from 'react';
import { UserIcon } from './icons/UserIcon';
import { DocumentIcon } from './icons/DocumentIcon';

interface HeaderProps {
    isLoggedIn: boolean;
    onLoginClick: () => void;
    onLogoutClick: () => void;
    onHomeClick: () => void;
    onNavClick: (anchor: string) => void;
    onContactClick: () => void;
    onAboutClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLoginClick, onLogoutClick, onHomeClick, onNavClick, onContactClick, onAboutClick }) => {
    
    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
        e.preventDefault();
        onNavClick(anchor);
    };
    
    return (
        <header className="bg-gray-900/70 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-white/10">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <button onClick={onHomeClick} className="flex items-center space-x-2">
                    <DocumentIcon className="h-8 w-8 text-cyan-400" />
                    <span className="text-2xl font-bold text-white">Auto Doc</span>
                </button>
                <nav className="hidden md:flex items-center space-x-8">
                    <a href="#features" onClick={(e) => handleNav(e, 'features')} className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Features</a>
                    <a href="#templates" onClick={(e) => handleNav(e, 'templates')} className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Templates</a>
                    <a href="#testimonials" onClick={(e) => handleNav(e, 'testimonials')} className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Testimonials</a>
                    <a href="#pricing" onClick={(e) => handleNav(e, 'pricing')} className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Pricing</a>
                    <a href="#faq" onClick={(e) => handleNav(e, 'faq')} className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">FAQ</a>
                    <a href="#!" onClick={(e) => { e.preventDefault(); onAboutClick(); }} className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">About</a>
                    <a href="#!" onClick={(e) => { e.preventDefault(); onContactClick(); }} className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Contact</a>
                </nav>
                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <div className="relative group">
                            <button className="flex items-center space-x-2">
                                <UserIcon className="h-8 w-8 p-1 rounded-full bg-gray-700 text-gray-300" />
                                <span className="hidden sm:inline font-medium text-gray-200">My Account</span>
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 border border-gray-700">
                                <a href="#!" onClick={(e) => { e.preventDefault(); alert('Profile page coming soon!'); }} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-cyan-400">Profile</a>
                                <a href="#!" onClick={(e) => { e.preventDefault(); alert('Settings page coming soon!'); }} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-cyan-400">Settings</a>
                                <button onClick={onLogoutClick} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-cyan-400">Logout</button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={onLoginClick} className="bg-cyan-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors shadow-md shadow-cyan-500/20">
                            Log In
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};
