import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StaggerContainerProps {
    children: ReactNode;
    staggerDelay?: number;
    className?: string;
}

export const StaggerContainer = ({
    children,
    staggerDelay = 0.1,
    className = ''
}: StaggerContainerProps) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
    const item = {
        hidden: { y: 30, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
            }
        },
    };

    return (
        <motion.div variants={item} className={className}>
            {children}
        </motion.div>
    );
};
