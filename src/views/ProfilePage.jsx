import React, { useEffect, useState } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AboutSection from '../components/Profile/AboutSection';
import ProfileHeader from '../components/Profile/ProfileHeader';
import { logout } from '../features/auth/authSlice';
import api from '../services/api';
import TabView from '../components/common/TabView';

const ProfilePage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

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

  // Define tabs for the TabView component
  const tabs = [
    {
      label: 'My Posts',
      content: (
        <div>
          {isOwner && (
            <div
              className="bg-tint-5 border-round p-3 flex align-items-center cursor-pointer"
              onClick={() => setIsModalOpen(true)} // Open modal on click
            >
              <img
                src={user.profile_photo_url}
                alt="Profile"
                className="h-3rem w-3rem border-circle mr-3"
              />
              <p className="m-0 text-primary">Add new post...</p>
            </div>
          )}
          {/* Placeholder for posts */}
          <div className="mt-4">
            {/* Your post items will go here */}
          </div>
        </div>
      ),
    },
    {
      label: 'Friends',
      content: (
        <div>
          {/* Placeholder for friends list */}
          <p>Friends list will be shown here.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex align-items-center flex-column">
      <ProfileHeader
        profile_photo_url={profileData.profile_photo_url}
        cover_photo_url={profileData.cover_photo_url}
        first_name={profileData.first_name}
        last_name={profileData.last_name}
        email={profileData.email}
        birthday={profileData.birthday}
        address={profileData.address}
        about={profileData.about}
        username={profileData.username}
        phone_number={profileData.phone_number}
        isOwner={isOwner}
        gender={profileData.gender}
      />
      <div className="flex flex-column sm:flex-row w-full md:w-10">
        <div className="sm:w-auto flex justify-content-center">
          <AboutSection />
        </div>
        <div className="w-full h-3rem mt-2">
          <TabView tabs={tabs} />
        </div>
      </div>
      {/* Modal for creating a new post will go here */}
    </div>
  );
};

export default ProfilePage;
