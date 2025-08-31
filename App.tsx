
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DocumentEditor } from './components/DocumentEditor';
import { TemplateCard } from './components/TemplateCard';
import { PricingCard } from './components/PricingCard';
import { Modal } from './components/Modal';
import { TestimonialCard } from './components/TestimonialCard';
import { FaqItem } from './components/FaqItem';
import { SAMPLE_TEMPLATES, PRICING_PLANS, FEATURES, TESTIMONIALS, FAQ_DATA } from './constants';
import type { Template, PricingPlan, Testimonial, FaqItem as FaqItemType } from './types';

enum View {
    LANDING,
    EDITOR,
}

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [view, setView] = useState<View>(View.LANDING);
    const [editorInitialPrompt, setEditorInitialPrompt] = useState<string>('');

    const handleLogin = () => {
        setIsLoggedIn(true);
        setShowLoginModal(false);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleStartFromTemplate = useCallback((template: Template) => {
        setEditorInitialPrompt(template.prompt);
        setView(View.EDITOR);
        window.scrollTo(0, 0);
    }, []);
    
    const handleCreateNew = useCallback(() => {
        setEditorInitialPrompt('');
        setView(View.EDITOR);
        window.scrollTo(0, 0);
    }, []);

    const handleNavClick = (anchorId: string) => {
        if (view !== View.LANDING) {
            setView(View.LANDING);
            setTimeout(() => {
                document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleHomeClick = () => {
        if (view === View.LANDING) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setView(View.LANDING);
            window.scrollTo(0, 0);
        }
    };

    const renderLandingPage = () => (
        <>
            {/* Hero Section */}
            <section className="relative py-20 sm:py-32 animated-gradient overflow-hidden">
                 <div className="absolute inset-0 bg-black/30"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                        Create Professional Documents, <span className="text-cyan-400">Instantly.</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
                        Leverage the power of Gemini AI to generate, analyze, and perfect all your office documents. From reports to resumes, Auto Doc has you covered.
                    </p>
                    <div className="mt-10 flex justify-center gap-x-6">
                        <button onClick={handleCreateNew} className="rounded-md bg-cyan-600 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-all duration-300 transform hover:scale-105">
                            Start Creating Now
                        </button>
                        <a href="#templates" onClick={(e) => { e.preventDefault(); handleNavClick('templates'); }} className="rounded-md px-5 py-3 text-base font-semibold leading-6 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors">
                            Explore Templates <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </section>
            
            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 sm:py-24 bg-gray-900">
                <div className="container mx-auto px-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Get Your Document in 3 Easy Steps</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-gray-400">
                            Our intuitive editor makes document creation effortless.
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="flex flex-col items-center">
                             <div className="flex items-center justify-center h-16 w-16 rounded-full bg-cyan-900/50 text-cyan-300 border-2 border-cyan-700 text-2xl font-bold">1</div>
                             <h3 className="mt-6 text-xl font-semibold text-white">Describe</h3>
                             <p className="mt-2 text-gray-400">Simply describe the document you need. Add details, set the tone, and choose your language.</p>
                        </div>
                        <div className="flex flex-col items-center">
                              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-cyan-900/50 text-cyan-300 border-2 border-cyan-700 text-2xl font-bold">2</div>
                             <h3 className="mt-6 text-xl font-semibold text-white">Generate</h3>
                             <p className="mt-2 text-gray-400">Our powerful AI gets to work, crafting a professional document based on your instructions in seconds.</p>
                        </div>
                        <div className="flex flex-col items-center">
                             <div className="flex items-center justify-center h-16 w-16 rounded-full bg-cyan-900/50 text-cyan-300 border-2 border-cyan-700 text-2xl font-bold">3</div>
                             <h3 className="mt-6 text-xl font-semibold text-white">Export & Refine</h3>
                             <p className="mt-2 text-gray-400">Download your document in your chosen format, or use our AI analysis tools to perfect it.</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Features Section */}
            <section id="features" className="bg-gray-800 py-20 sm:py-24">
                 <div className="container mx-auto px-6">
                     <div className="text-center">
                        <h2 className="text-base font-semibold leading-7 text-cyan-400">Everything You Need</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Streamline Your Workflow</p>
                        <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-gray-400">
                            Our AI-powered tools are designed to save you time and enhance your productivity, making document creation a breeze.
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {FEATURES.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <div key={feature.name} className="relative pl-16">
                                    <dt className="text-lg font-semibold leading-7 text-white">
                                        <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-600 shadow-lg shadow-cyan-500/20">
                                            <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-400">{feature.description}</dd>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Templates Section */}
            <section id="templates" className="bg-gray-900 py-20 sm:py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Start with a Proven Template</h2>
                        <p className="mt-4 text-lg text-gray-400">Choose from our curated collection of templates to get started in seconds.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {SAMPLE_TEMPLATES.map((template: Template) => (
                            <TemplateCard key={template.title} template={template} onSelect={handleStartFromTemplate} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="bg-gray-800 py-20 sm:py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">What Our Customers Say</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-gray-400">
                            Thousands of professionals trust Auto Doc to streamline their document creation process.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((testimonial: Testimonial, index: number) => (
                            <TestimonialCard key={index} testimonial={testimonial} />
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Pricing Section */}
            <section id="pricing" className="bg-gray-900 py-20 sm:py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Simple, Transparent Pricing</h2>
                        <p className="mt-4 text-lg text-gray-400">Choose the plan that's right for you and unlock powerful features.</p>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-end gap-8">
                        {PRICING_PLANS.map((plan: PricingPlan) => (
                            <PricingCard key={plan.name} plan={plan} />
                        ))}
                    </div>
                </div>
            </section>

             {/* FAQ Section */}
            <section id="faq" className="bg-gray-800 py-20 sm:py-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Frequently Asked Questions</h2>
                            <p className="mt-4 text-lg text-gray-400">
                                Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
                            </p>
                        </div>
                        <dl className="space-y-6 divide-y divide-gray-700">
                           {FAQ_DATA.map((item: FaqItemType, index: number) => (
                                <FaqItem key={index} item={item} />
                           ))}
                        </dl>
                    </div>
                </div>
            </section>
        </>
    );

    const renderEditor = () => (
        <DocumentEditor 
            initialPrompt={editorInitialPrompt}
            onBack={() => setView(View.LANDING)} 
        />
    );

    return (
        <div className="min-h-screen flex flex-col">
            <Header 
                isLoggedIn={isLoggedIn} 
                onLoginClick={() => setShowLoginModal(true)} 
                onLogoutClick={handleLogout}
                onHomeClick={handleHomeClick}
                onNavClick={handleNavClick}
            />
            <main className="flex-grow">
                {view === View.LANDING ? renderLandingPage() : renderEditor()}
            </main>
            <Footer />

            {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                    <div className="p-8 bg-gray-800 rounded-lg">
                        <h2 className="text-2xl font-bold text-center text-white">Welcome Back</h2>
                        <p className="text-center text-gray-400 mt-2">Login to manage your account.</p>
                        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                            <div className="mt-6 space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                                    <input type="email" id="email" defaultValue="demo@autodoc.com" className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm text-white" />
                                </div>
                                <div>
                                    <label htmlFor="password"  className="block text-sm font-medium text-gray-300">Password</label>
                                    <input type="password" id="password" defaultValue="password" className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm text-white" />
                                </div>
                            </div>
                            <div className="mt-8">
                                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors">
                                    Log In
                                </button>
                            </div>
                            <p className="mt-4 text-center text-sm text-gray-500">
                                No account? <a href="#!" onClick={(e) => { e.preventDefault(); alert('Sign up feature coming soon!'); }} className="font-medium text-cyan-400 hover:text-cyan-300">Sign up</a>
                            </p>
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default App;