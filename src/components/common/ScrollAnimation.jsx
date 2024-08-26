import React, { useEffect } from 'react';

const ScrollAnimation = () => {
    useEffect(() => {
        const handleScroll = () => {
            const elements = document.querySelectorAll('.scroll-animation');

            elements.forEach(element => {
                const position = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (position < windowHeight - 100) {
                    element.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="grid justify-content-center align-items-center">
            <div className="col-12 md:col-4 scroll-animation">
                <h3>Create Your Virtual Garden</h3>
            </div>
            <div className="col-12 md:col-4 scroll-animation">
                <h3>Add Your Real-Life Plants</h3>
            </div>
            <div className="col-12 md:col-4 scroll-animation">
                <h3>Track and Monitor Progress</h3>
            </div>
            {/* Continue with other steps... */}
        </div>
    );
};

export default ScrollAnimation;
