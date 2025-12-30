import { useEffect, useState } from 'react';

interface AnimatedNumberProps {
    value: string;
    shouldAnimate: boolean;
    className?: string;
}

export const AnimatedNumber = ({ value, shouldAnimate, className = '' }: AnimatedNumberProps) => {
    const [displayValue, setDisplayValue] = useState('0');

    useEffect(() => {
        if (!shouldAnimate) {
            setDisplayValue('0');
            return;
        }

        // Extract number and suffix (e.g., "172+" -> number: 172, suffix: "+")
        const match = value.match(/^(\d+(?:\.\d+)?)(.*)/);
        if (!match) {
            setDisplayValue(value);
            return;
        }

        const targetNumber = parseFloat(match[1]);
        const suffix = match[2];
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = targetNumber / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current = Math.min(current + increment, targetNumber);

            // Format the number
            const formatted = current % 1 === 0 ? current.toString() : current.toFixed(1);
            setDisplayValue(formatted + suffix);

            if (step >= steps || current >= targetNumber) {
                setDisplayValue(targetNumber.toString() + suffix);
                clearInterval(timer);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value, shouldAnimate]);

    return <div className={className}>{displayValue}</div>;
};
