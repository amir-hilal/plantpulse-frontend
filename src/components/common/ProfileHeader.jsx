import React from 'react';
import { Button } from 'primereact/button';

const ProfileHeader = ({ profilePicture, coverPhoto, firstName, lastName, username }) => {
    return (
        <div className="profile-header relative">
            <div
                className="cover-photo h-20rem bg-cover bg-center border-round-lg"
                style={{
                    backgroundImage: `url(${coverPhoto})`,
                }}
            >
                <Button
                    label="Edit Cover Photo"
                    icon="pi pi-pencil"
                    className="absolute top-1 right-1 p-button-secondary"
                />
            </div>

            <div className="profile-info flex align-items-center p-3 bg-tint-5 border-round-xl shadow-2 mt-[-2rem] relative z-1 mx-3">
                <img
                    src={profilePicture}
                    alt="Profile"
                    className="h-6rem w-6rem border-circle mr-4 shadow-1"
                />
                <div>
                    <h2 className="text-xl text-primary m-0">{firstName} {lastName}</h2>
                    <p className="text-secondary m-0">{username}</p>
                </div>
                <div className="ml-auto">
                    <Button label="Edit Profile" className="p-button-primary" />
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
