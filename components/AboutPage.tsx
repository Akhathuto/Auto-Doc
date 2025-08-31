
import React from 'react';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { UserGroupIcon } from './icons/UserGroupIcon';

const industryClassifications = [
    "Mining and quarrying",
    "Manufacturing",
    "Wholesale and retail trade",
    "Transportation and storage",
    "Information and communication",
    "Professional, scientific and technical activities",
    "Administrative and support activities",
    "Public administration and defence",
    "Other service activities"
];

const leadership = [
    { name: "Siphosakhe Mathews", title: "Director & Co-Founder (30% Ownership)" },
    { name: "Ranthutu Lepheane", title: "Director & Co-Founder (70% Ownership)" }
];

export const AboutPage: React.FC = () => {
    return (
        <div className="bg-gray-900 py-20 sm:py-24">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">About EDGTEC</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-400">
                            Pioneering the future of automated document solutions with intelligent, user-centric technology.
                        </p>
                    </div>

                    <div className="bg-gray-800/50 border border-gray-700 p-8 sm:p-12 rounded-2xl shadow-2xl space-y-12">
                        {/* Mission Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                            <p className="text-gray-300 leading-relaxed">
                                At EDGTEC, our mission is to build innovative software that blends cutting-edge AI with exceptional design. We believe that powerful tools should be accessible, intuitive, and inspiring to use. Auto Doc is our flagship product, embodying our commitment to quality, efficiency, and empowering professionals to achieve more. We strive to automate the mundane, so our users can focus on what truly matters.
                            </p>
                        </div>
                        
                        {/* Industry Expertise Section */}
                        <div>
                             <div className="flex items-center space-x-3 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center border border-cyan-800">
                                    <BriefcaseIcon className="w-6 h-6 text-cyan-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Our Industry Expertise</h2>
                            </div>
                            <p className="text-gray-400 mb-6">
                                Our solutions are built on a foundation of deep expertise across a wide range of sectors. Our official classifications include:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
                                {industryClassifications.map(industry => (
                                    <div key={industry} className="bg-gray-900/60 p-4 rounded-lg border border-gray-700">
                                        <p className="font-medium text-gray-300 text-sm">{industry}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Leadership Section */}
                        <div>
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center border border-cyan-800">
                                    <UserGroupIcon className="w-6 h-6 text-cyan-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Meet Our Leadership</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {leadership.map(leader => (
                                    <div key={leader.name} className="bg-gray-900/60 p-6 rounded-lg border border-gray-700 text-center">
                                        <h3 className="text-xl font-semibold text-white">{leader.name}</h3>
                                        <p className="mt-2 text-cyan-400">{leader.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
