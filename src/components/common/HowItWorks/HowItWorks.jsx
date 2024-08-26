import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './HowItWorks.css';

const HowItWorks = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        { title: "Create Your Virtual Garden", description: "Start by setting up your garden space within the app, where you'll add and manage your real-life plants.", icon: "pi pi-th-large" },
        { title: "Add Your Real-Life Plants", description: "Enter details and upload pictures of your plants to begin tracking their progress.", icon: "pi pi-plus-circle" },
        { title: "Track and Monitor Progress", description: "Monitor your plants' health with regular updates, photos, and notifications.", icon: "pi pi-chart-line" },
        { title: "Join the Community", description: "Connect with fellow gardeners, share your progress, and learn from others.", icon: "pi pi-users" },
        { title: "Get Expert Advice", description: "Use Flora, your garden helper, to get quick answers to your gardening questions.", icon: "pi pi-info-circle" }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll(".step");
            const scrollTop = window.scrollY + window.innerHeight * 0.8;

            sections.forEach((section, index) => {
                if (scrollTop > section.offsetTop) {
                    setActiveStep(index + 1);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="how-it-works-container container mx-auto py-12 px-4">
            <h2 className="text-center text-3xl font-bold text-blue-900 mb-8">How It Works</h2>
            <div className="grid-container">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        className={`step ${index % 2 === 0 ? 'left' : 'right'}`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: activeStep > index ? 1 : 0, y: activeStep > index ? 0 : 50 }}
                        transition={{ duration: 0.5, delay: index * 0.3 }}
                    >
                        <div className="card-content">
                            <i className={`${step.icon} text-green-600 text-3xl mr-4`}></i>
                            <div>
                                <h3 className="text-xl font-bold text-blue-900">{step.title}</h3>
                                <p className="text-gray-700">{step.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {/* Adjust the paths below to match the design */}
                    <motion.path
                        d="M200,100 C250,150 350,150 400,100" // Adjust coordinates as needed
                        stroke="#38b2ac"
                        strokeWidth="2"
                        fill="transparent"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: activeStep >= 2 ? 1 : 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M400,200 C450,250 550,250 600,200" // Adjust coordinates as needed
                        stroke="#38b2ac"
                        strokeWidth="2"
                        fill="transparent"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: activeStep >= 3 ? 1 : 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                    {/* Continue adding paths for each arrow */}
                </svg>
            </div>
        </div>
    );
};

export default HowItWorks;
