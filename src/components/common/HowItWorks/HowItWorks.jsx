import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './HowItWorks.css';
import ArrowSVG from '../../../assets/svg/Vector143.svg'
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
        <div className=" relative container py-12">
            <h2 className="text-center text-3xl font-bold text-blue-900 mb-8">How It Works</h2>
            <div className="grid-container">
                {steps.map((step, index) => (
                    <React.Fragment key={index}>
                        <motion.div
                            className={`step ${index % 2 === 0 ? 'left' : 'right'}`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: activeStep > index ? 1 : 0, y: activeStep > index ? 0 : 50 }}
                            transition={{ duration: 1, delay: index * 0.3 }}
                        >
                            <div className="card-content">
                                <i className={`${step.icon} text-green-600 text-3xl mr-4`}></i>
                                <div>
                                    <h3 className="text-xl font-bold text-blue-900">{step.title}</h3>
                                    <p className="text-grey">{step.description}</p>
                                </div>
                            </div>
                        </motion.div>
                        {index < steps.length - 1 && (
                            <img
                                src={ArrowSVG}
                                alt="Arrow"
                                className={`arrow-svg ${index % 2 === 0 ? '' : 'rotate'}`}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;
