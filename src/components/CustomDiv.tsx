import { motion } from "framer-motion";
import React from "react";

type CustomDivProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    className?: string;
};

const CustomDiv: React.FC<CustomDivProps> = ({ children, className = "", ...rest }) => {
    return (

        <div className={`w-full px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-700`}>
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{
                    duration: 0.5,
                    ease: [0.23, 0.74, 0.19, 1]
                }}
            >
                <div className={`mx-auto max-w-6xl  ${className}`} {...rest}>
                    {children}
                </div>
            </motion.div>
        </div>

    );
};

export default CustomDiv;
