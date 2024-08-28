import React from 'react';
import { useSelector } from 'react-redux';
import ProfileHeader from '../components/Profile/ProfileHeader';
import AboutSection from '../components/Profile/AboutSection';

const ProfilePage = () => {
    const user = useSelector((state) => state.auth.userProfile);

    return (
        <div className="flex align-items-center flex-column">
            <ProfileHeader
                profilePicture={user.profile_photo_url}
                coverPhoto={user.cover_photo_url}
                firstName={user.first_name}
                lastName={user.last_name}
                username={user.username}
            />
            <div className="flex justify-content-between w-full mt-4 px-4">
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
