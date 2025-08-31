import React from 'react';
import type { Template } from '../types';

interface TemplateCardProps {
    template: Template;
    onSelect: (template: Template) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
    const Icon = template.icon;
    return (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg hover:shadow-cyan-500/10 hover:border-cyan-500 hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center border border-cyan-800">
                        <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">{template.title}</h3>
                    <p className="mt-1 text-gray-400 text-sm">{template.description}</p>
                </div>
            </div>

            {/* Preview Area */}
            <div className="mt-4 flex-grow h-36 bg-gray-900/50 rounded-md p-3 border border-gray-700 text-xs text-gray-500 overflow-hidden">
                {/* Text preview with multi-line truncation and ellipsis */}
                {template.preview.type === 'text' && (
                     <p className="whitespace-pre-wrap text-gray-400 line-clamp-6">{template.preview.content}</p>
                )}
                {/* Table preview with a clean, simple grid structure */}
                {template.preview.type === 'table' && (
                    <table className="w-full border-collapse border border-gray-600">
                        <thead>
                            <tr className="bg-gray-800/50">
                                {/* FIX: Cast template.preview.content to string[] to resolve type narrowing issue. */}
                                {(template.preview.content as string[]).slice(0, 4).map(header => (
                                    <th key={header} className="border border-gray-600 p-1.5 text-center text-xs font-medium text-gray-300 truncate">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(3)].map((_, rowIndex) => (
                                <tr key={rowIndex}>
                                    {/* FIX: Cast template.preview.content to string[] to resolve type narrowing issue. */}
                                    {(template.preview.content as string[]).slice(0, 4).map((_, colIndex) => (
                                        <td key={colIndex} className="border border-gray-600 h-6">
                                           {/* Empty cell to form the grid */}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
                 <button onClick={() => onSelect(template)} className="w-full text-left text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                    Use Template <span aria-hidden="true">→</span>
                </button>
            </div>
        </div>
    );
};