import React, { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchGardens } from '../../features/garden/gardensSlice';

const MyGardensCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gardens, loading, error } = useSelector((state) => state.gardens);

  useEffect(() => {
    dispatch(fetchGardens());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex justify-content-center align-items-center h-full">
        <Loading type="spin" color="#019444" height={50} width={50} />
      </div>
    );
  if (error) return <p>Error loading gardens: {error}</p>;

  const styles = {
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    img: {
      borderRadius: '12px',
    },
    placeholderImg: {
      width: '170px',
      height: '170px',
      borderRadius: '10px', // Matches the border-radius of the image
      backgroundColor: '#e0e0e0', // Placeholder color (you can adjust this)
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    <div className="h-full cursor-pointer">
      <div className="flex justify-content-between mt-3 mb-4">
        <h2
          className="flex align-items-center m-0"
          onClick={() => navigate(`/my-gardens`)}
        >
          Go to My Gardens <IoIosArrowForward className="ml-2" />
        </h2>
        <button
          onClick={() => navigate('/my-gardens')}
          className=" text-sm bg-primary border-round-lg border-solid border-primary hover:bg-primary-reverse py-2  flex align-items-center justify-content-center cursor-pointer ml-1 md:ml-0"
        >
          <FaPlus className="mr-2" />
          Add Garden
        </button>
      </div>

      <div
        className="flex align-items-center justify-content-center w-full"
        onClick={() => navigate(`/my-gardens`)}
      >
        <div
          style={{
            ...styles.carouselItems,
            scrollbarWidth: 'thin',
            scrollbarColor: '#263238 #F0F0F0', // Adjust colors as needed
          }}
          className="flex w-full overflow-x-auto"
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              height: 8px; /* Adjust the scrollbar height */
            }
            div::-webkit-scrollbar-thumb {
              background-color: #263238; /* Color of the scrollbar thumb */
              border-radius: 10px; /* Rounded corners for the thumb */
            }
            div::-webkit-scrollbar-track {
              background-color: #263238; /* Color of the track */
              border-radius: 10px; /* Rounded corners for the track */
            }
            div::-webkit-scrollbar-button {
              display: none; /* Hide the arrows */
            }
          `}</style>
          {gardens.map((garden) => (
            <div key={garden.id} style={styles.card} className="mr-4">
              {garden.image_url ? (
                <img
                  src={garden.image_url}
                  alt={garden.name}
                  style={styles.img}
                  width={170}
                  height={170}
                />
              ) : (
                <div style={styles.placeholderImg}></div>
              )}
              <h3>{garden.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyGardensCarousel;
