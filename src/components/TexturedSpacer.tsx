import { motion } from 'framer-motion';
import React from 'react';

interface TexturedSpacerProps {
    height: number;
    className?: string;
}

const TexturedSpacer: React.FC<TexturedSpacerProps> = ({ height, className = '' }) => {
    return (
        <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{
                duration: 0.5,
                ease: [0.23, 0.74, 0.19, 1]
            }}
        >

            <div
                aria-hidden
                className={`pointer-events-none w-full bg-textured-rails  border-b border-gray-200 dark:border-gray-700 ${className}`}
                style={{ height: `${height}px` }}
            />
        </motion.div>
    );
};

export default TexturedSpacer;
