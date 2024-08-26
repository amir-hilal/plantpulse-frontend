import React, { useState } from 'react';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const features = [
        { title: "Advanced Plant Tracking", description: "Monitor plant growth and get care alerts." },
        { title: "Explore And Learn", description: "Discover plant care tips and guides." },
        { title: "Real-Time Weather Updates", description: "Get live weather info." },
    ];

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % features.length);
    };

    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + features.length) % features.length);
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto mt-8">
            <div className="overflow-hidden">
                <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {features.map((feature, index) => (
                        <div key={index} className="w-full flex-shrink-0 p-4 bg-blue-50 text-center rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-700">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-2 py-1 rounded-full">Prev</button>
            <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-2 py-1 rounded-full">Next</button>
        </div>
    );
};

export default Carousel;
