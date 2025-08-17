import React from 'react';

interface TexturedDivProps {
    className?: string;
    children?: React.ReactNode;
}

const TexturedDiv: React.FC<TexturedDivProps> = ({ className = '', children }) => {
    return (
        <div className={`relative ${className}`}>
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 h-full w-full bg-background 
                bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] 
                dark:bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1a_1px,transparent_1px)] 
                bg-[size:14px_24px]"
            />
            {children}
        </div>
    );
};

export default TexturedDiv;


