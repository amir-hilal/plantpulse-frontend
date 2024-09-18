import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import { toast } from 'react-toastify';

const VerifyEmailNotice = () => {
  const user = useSelector((state) => state.auth.userProfile);
  const [loading, setLoading] = useState(false);

  const handleResendVerification = async () => {
    setLoading(true);
    try {
      await api.post('/email/resend');
      toast.success('Verification email resent successfully.');
    } catch (error) {
      toast.error('Failed to resend verification email. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (user && !user.email_verified_at) {
    return (
      <div className="bg-warning text-center py-1 px-3 border-round-lg my-1 mx-3 flex justify-content-between align-items-center">
        <p className='m-0 text-left'>Your email is not verified. Please check your email to verify your account.</p>
        <button
          onClick={handleResendVerification}
          className="bg-primary border-round border-solid border-primary hover:bg-primary-reverse cursor-pointer py-2 px-4"
          disabled={loading}
        >
          {loading ? 'Resending...' : 'Resend Verification Email'}
        </button>
      </div>
    );
  }

  return null;
};

export default VerifyEmailNotice;
