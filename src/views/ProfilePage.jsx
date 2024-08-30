import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileHeader from '../components/Profile/ProfileHeader';
import AboutSection from '../components/Profile/AboutSection';
import Loading from 'react-loading';
import api from '../services/api';
import { logout } from '../features/auth/authSlice';

const ProfilePage = () => {
    const { username } = useParams();
    const dispatch = useDispatch();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);

    const user = useSelector((state) => state.auth.userProfile);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get(`/users/${username}`);
                setProfileData(response.data);
                if (user && response.data.username === user.username) {
                    setIsOwner(true);
                }
            } catch (error) {
                if (error.response.status === 404) {
                    setProfileData(null);
                } else if (error.response.status === 401) {
                    dispatch(logout());
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username, user, dispatch]);

    if (loading) {
        return (
            <div className="flex justify-content-center align-items-center h-screen">
                <Loading type="spin" color="#019444" height={50} width={50} />
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="flex justify-content-center align-items-center h-screen">
                <h2>User not found</h2>
            </div>
        );
    }

    return (
        <div className="flex align-items-center flex-column">
            <ProfileHeader
                profilePicture={profileData.profile_photo_url}
                coverPhoto={profileData.cover_photo_url}
                firstName={profileData.first_name}
                lastName={profileData.last_name}
                username={profileData.username}
            />
            <div className="flex flex-column sm:flex-row w-full md:w-10">
                {/* About section */}
                <div className="sm:w-auto flex justify-content-center">
                    <AboutSection />
                </div>
                {/* Post section (to be implemented later) */}
                <div className="sm:w-9 h-3rem">
                    <div className='bg-primary w-full h-3'><p>Posts</p></div>
                    {/* Placeholder for posts */}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
