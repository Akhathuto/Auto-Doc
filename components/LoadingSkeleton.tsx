import React from 'react';

export const LoadingSkeleton: React.FC = () => (
    <div className="animate-pulse">
        <div className="h-6 bg-gray-700 rounded-md w-1/3 mb-6"></div>
        <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded-md w-full"></div>
            <div className="h-4 bg-gray-700 rounded-md w-5/6"></div>
            <div className="h-4 bg-gray-700 rounded-md w-full"></div>
            <div className="h-4 bg-gray-700 rounded-md w-4/6"></div>
            <div className="h-4 bg-gray-700 rounded-md w-full"></div>
            <div className="h-4 bg-gray-700 rounded-md w-1/2"></div>
            <div className="h-4 bg-gray-700 rounded-md w-full"></div>
            <div className="h-4 bg-gray-700 rounded-md w-5/6"></div>
        </div>
    </div>
);