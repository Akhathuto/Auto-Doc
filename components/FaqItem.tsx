
import React, { useState } from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface FaqItemProps {
    item: {
        question: string;
        answer: string;
    };
}

export const FaqItem: React.FC<FaqItemProps> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="py-6">
            <dt>
                <button onClick={() => setIsOpen(!isOpen)} className="flex w-full items-start justify-between text-left text-white" aria-expanded={isOpen}>
                    <span className="text-base font-semibold leading-7">{item.question}</span>
                    <span className="ml-6 flex h-7 items-center text-gray-400">
                        <ChevronDownIcon
                            className={`h-6 w-6 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180 text-cyan-400' : ''}`}
                            aria-hidden="true"
                        />
                    </span>
                </button>
            </dt>
            <dd className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                <div className="pr-12">
                     <p className="text-base leading-7 text-gray-400">{item.answer}</p>
                </div>
            </dd>
        </div>
    );
};