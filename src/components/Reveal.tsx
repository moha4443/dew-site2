import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface RevealProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';
    delay?: number;
    duration?: number;
    className?: string;
}

const directionVariants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 },
    scale: { scale: 0.8, opacity: 0 },
    none: { opacity: 0 },
};

export const Reveal = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.8,
    className = ''
}: RevealProps) => {
    const { elementRef, isVisible } = useScrollReveal();

    return (
        <motion.div
            ref={elementRef as any}
            initial={directionVariants[direction]}
            animate={isVisible ? { x: 0, y: 0, scale: 1, opacity: 1 } : directionVariants[direction]}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth feel
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
