import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TutorialCard = ({ tutorial }) => {
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();
  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  // Format views into K and M
  const formatViews = (views) => {
    const numViews = parseInt(views);
    if (numViews >= 1000000) {
      return `${(numViews / 1000000).toFixed(1)}M`;
    } else if (numViews >= 1000) {
      return `${(numViews / 1000).toFixed(1)}K`;
    }
    return views;
  };

  const formatDuration = (duration) => {
    if (!duration) {
      return 'N/A';
    }

    const parts = duration.split(':');
    if (parts.length === 3 && parts[0] === '00') {
      return `${parts[1]}:${parts[2]}`;
    }
    return duration;
  };

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}/tutorials/${tutorial.id}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success('Link copied to clipboard!');
    setShowPopover(false);
  };

  const handleViewPost = () => {
    navigate(`/tutorials/${tutorial.id}`);
  };

  return (
    <div className="col-12 md:col-4 lg:col-3 md:m-3 lg:m-0 cursor-pointer">
      <div className='mb-6'>
        {/* Display YouTube Thumbnail */}
        <div className="relative mb-1">
          <img
            src={tutorial.thumbnail_url}
            alt={tutorial.title}
            onClick={handleViewPost}
            className="w-full border-round-xl"
          />
          <p className="absolute right-0 bottom-0 text-xs border-round-md surface-50 p-1 mr-1">
            {formatDuration(tutorial.duration)}
          </p>
        </div>

        {/* Tutorial Information */}
        <div className="flex justify-content-between align-items-center">
          <h4
            className="text-left font-light m-0 text-base p-0 flex align-items-center "
            onClick={handleViewPost}
          >
            <strong>{tutorial.title}</strong>
          </h4>
          <div className="relative flex align-items-center">
            <FaEllipsisH
              className="text-grey cursor-pointer rotate-90"
              onClick={togglePopover}
            />
            {showPopover && (
              <div className="absolute right-0 top-100 surface-100 border-round shadow-2 p-2 w-8rem">
                <button
                  className="text-sm p-2 border-none bg-transparent cursor-pointer hover:bg-primary-reverse text-left"
                  onClick={handleCopyLink}
                >
                  Copy YouTube Link
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Tutorial Details */}
        <div className="text-left mt-2">
          <p className="text-xs text-grey m-0">
            {formatViews(tutorial.views)} views
          </p>
        </div>
      </div>
    </div>
  );
};

export default TutorialCard;
