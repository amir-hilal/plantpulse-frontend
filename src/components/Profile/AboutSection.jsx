import React from 'react';
import { useSelector } from 'react-redux';
import { FaUser, FaBirthdayCake, FaMapMarkerAlt, FaEnvelope, FaPhone, FaDownload } from 'react-icons/fa';

const AboutSection = () => {
    const user = useSelector((state) => state.auth.userProfile);

    return (
        <div className="bg-tint-5 p-4 border-round-lg shadow-2" style={{ width: '100%', maxWidth: '300px' }}>
            <h2 className="text-primary">About</h2>
            <div className="flex align-items-center my-3">
                <FaUser className="text-primary mr-2" />
                <span>{user.gender}</span>
            </div>
            <div className="flex align-items-center my-3">
                <FaBirthdayCake className="text-primary mr-2" />
                <span>Born {new Date(user.birthday).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex align-items-center my-3">
                <FaMapMarkerAlt className="text-primary mr-2" />
                <span>{user.address}</span>
            </div>
            <div className="flex align-items-center my-3">
                <FaEnvelope className="text-primary mr-2" />
                <span>{user.email}</span>
            </div>
            <div className="flex align-items-center my-3">
                <FaPhone className="text-primary mr-2" />
                <span>{user.phone_number}</span>
            </div>
            <button className="p-button w-full mt-4 flex align-items-center justify-content-center">
                <FaDownload className="mr-2" />
                Export Data
            </button>
        </div>
    );
};

export default AboutSection;
