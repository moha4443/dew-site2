import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
    end: number;
    duration?: number;
    start?: number;
    decimals?: number;
}

export const useCountUp = ({ end, duration = 2000, start = 0, decimals = 0 }: UseCountUpOptions) => {
    const [count, setCount] = useState(start);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    setIsVisible(true);
                    hasAnimated.current = true;
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const startTime = Date.now();
        const difference = end - start;

        const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = start + difference * easeOutQuart;

            setCount(Number(currentCount.toFixed(decimals)));

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(animate);
    }, [isVisible, end, start, duration, decimals]);

    return { ref, count };
};
