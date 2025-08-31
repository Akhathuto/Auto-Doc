
import React from 'react';
import type { PricingPlan } from '../types';
import { CheckIcon } from './icons/CheckIcon';

interface PricingCardProps {
    plan: PricingPlan;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
    return (
        <div className={`w-full max-w-sm p-8 rounded-xl border ${plan.isPopular ? 'border-cyan-500 bg-gray-800 scale-105 shadow-2xl shadow-cyan-500/10' : 'bg-gray-800 border-gray-700'} transition-all duration-300`}>
            {plan.isPopular && (
                <div className="text-center">
                    <p className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-cyan-600">Most Popular</p>
                </div>
            )}
            <div className="text-center mt-4">
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-gray-400">{plan.description}</p>
                <div className="mt-6">
                    <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                    {plan.price !== 'Contact Us' && <span className="text-base font-medium text-gray-400">/month</span>}
                </div>
            </div>
            <ul className="mt-8 space-y-4">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                            <CheckIcon className="w-6 h-6 text-cyan-400" />
                        </div>
                        <p className="ml-3 text-base text-gray-300">{feature}</p>
                    </li>
                ))}
            </ul>
            <div className="mt-10">
                <button
                    onClick={() => alert(`Selected ${plan.name} plan!`)}
                    className={`w-full px-6 py-3 text-base font-semibold rounded-md shadow-sm transition-colors ${plan.isPopular ? 'bg-cyan-600 text-white hover:bg-cyan-700 shadow-lg shadow-cyan-500/20' : 'bg-cyan-900/50 text-cyan-300 hover:bg-cyan-900'}`}>
                    Choose Plan
                </button>
            </div>
        </div>
    );
};