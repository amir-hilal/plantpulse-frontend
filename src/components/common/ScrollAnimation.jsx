import React, { useEffect, useRef } from 'react';

const ScrollAnimation = () => {
    const steps = [
        "Create Your Virtual Garden",
        "Add Your Real-Life Plants",
        "Track and Monitor Progress",
        "Join the Community",
        "Get Expert Advice"
    ];

    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            const containerTop = container.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (containerTop < windowHeight) {
                container.classList.add('animate-draw');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={containerRef} className="my-8 mx-auto max-w-3xl">
            {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center my-4">
                    <div className="bg-green-200 p-4 rounded-lg shadow-lg w-full">
                        <h3 className="text-lg font-semibold text-center">{step}</h3>
                    </div>
                    {index < steps.length - 1 && <div className="w-px h-8 bg-gray-400"></div>}
                </div>
            ))}
        </div>
    );
};

export default ScrollAnimation;
