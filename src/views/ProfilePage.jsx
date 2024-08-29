import React from 'react';
import { useSelector } from 'react-redux';
import ProfileHeader from '../components/Profile/ProfileHeader';
import AboutSection from '../components/Profile/AboutSection';
import Loading from 'react-loading';

const ProfilePage = () => {
    const user = useSelector((state) => state.auth.userProfile);

    if (!user) {
        return (
            <div className="flex justify-content-center align-items-center h-screen">
                <Loading type="spin" color="#019444" height={50} width={50} />
            </div>
        );
    }

    return (
        <div className="flex align-items-center flex-column">
            <ProfileHeader
                profilePicture={user.profile_photo_url}
                coverPhoto={user.cover_photo_url}
                firstName={user.first_name}
                lastName={user.last_name}
                username={user.username}
            />
            <div className="flex justify-content-between w-9 px-4">
                {/* About section */}
                <div className="w-4">
                    <AboutSection />
                </div>
                {/* Post section (to be implemented later) */}
                <div className="w-8">
                    {/* Placeholder for posts */}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
