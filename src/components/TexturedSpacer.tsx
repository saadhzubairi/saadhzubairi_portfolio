import React from 'react';

interface TexturedSpacerProps {
    height: number;
    className?: string;
}

const TexturedSpacer: React.FC<TexturedSpacerProps> = ({ height, className = '' }) => {
    return (
        <div
            aria-hidden
            className={`pointer-events-none w-full bg-textured-rails  border-b border-gray-200 dark:border-gray-700 ${className}`}
            style={{ height: `${height}px` }}
        />
    );
};

export default TexturedSpacer;
