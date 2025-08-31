import React from 'react';
import { LocationIcon } from './icons/LocationIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { MailIcon } from './icons/MailIcon';

export const ContactPage: React.FC = () => {
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Thank you for your message! We'll get back to you shortly.");
        e.currentTarget.reset();
    };

    const inputClasses = "mt-1 block w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm text-white transition-colors";
    const labelClasses = "block text-sm font-semibold text-gray-300";

    return (
        <div className="bg-gray-900 py-20 sm:py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Get in Touch</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                        We'd love to hear from you. Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
                    </p>
                </div>
                
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 bg-gray-800/50 border border-gray-700 p-8 sm:p-12 rounded-2xl shadow-2xl">
                    {/* Contact Form */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className={labelClasses}>Full Name</label>
                                <input type="text" id="name" name="name" required className={inputClasses} placeholder="Your Name" />
                            </div>
                            <div>
                                <label htmlFor="email" className={labelClasses}>Email Address</label>
                                <input type="email" id="email" name="email" required className={inputClasses} placeholder="you@example.com" />
                            </div>
                            <div>
                                <label htmlFor="subject" className={labelClasses}>Subject</label>
                                <input type="text" id="subject" name="subject" required className={inputClasses} placeholder="How can we help?" />
                            </div>
                            <div>
                                <label htmlFor="message" className={labelClasses}>Message</label>
                                <textarea id="message" name="message" rows={5} required className={inputClasses} placeholder="Your message..."></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg shadow-lg shadow-cyan-500/20 text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all transform hover:scale-105">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                         <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                         <p className="text-gray-400">
                            Our team is available to assist you. Reach out to us through any of the channels below.
                         </p>
                         <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center border border-cyan-800">
                                    <LocationIcon className="w-6 h-6 text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Our Office</h3>
                                    <p className="text-gray-400">106312 Ngwabe Street Kwa-Thema Mini Selecourt, Springs, Gauteng, 1575, South Africa</p>
                                </div>
                            </div>
                             <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center border border-cyan-800">
                                    <PhoneIcon className="w-6 h-6 text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Phone</h3>
                                    <p className="text-gray-400">+27 71 184 6709</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center border border-cyan-800">
                                    <MailIcon className="w-6 h-6 text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Email</h3>
                                    <p className="text-gray-400">r.lepheane@outlook.com</p>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};