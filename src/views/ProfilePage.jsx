import React from 'react';
import { useSelector } from 'react-redux';
import ProfileHeader from '../components/common/ProfileHeader';

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
            {/* Additional profile page content can go here */}
        </div>
    );
};

export default ProfilePage;
