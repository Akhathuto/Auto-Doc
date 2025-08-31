
import React from 'react';
import type { Testimonial } from '../types';
import { QuoteIcon } from './icons/QuoteIcon';

interface TestimonialCardProps {
    testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
    return (
        <figure className="rounded-xl p-8 bg-gray-900 shadow-lg border border-gray-700 flex flex-col transition-all duration-300 hover:border-cyan-700 hover:shadow-cyan-500/10">
            <QuoteIcon className="h-10 w-10 text-cyan-800 flex-shrink-0" />
            <blockquote className="mt-6 text-gray-300 flex-grow">
                <p>“{testimonial.quote}”</p>
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-x-4">
                <img className="h-12 w-12 rounded-full bg-gray-800 object-cover" src={testimonial.avatar} alt={`${testimonial.name} avatar`} />
                <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-gray-400">{testimonial.title}</div>
                </div>
            </figcaption>
        </figure>
    );
};