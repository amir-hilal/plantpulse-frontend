import React, { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
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

  if (loading) return <p>Loading gardens...</p>;
  if (error) return <p>Error loading gardens: {error}</p>;

  const styles = {
    img: {
      borderRadius: '12px',
    }
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
          style={styles.carouselItems}
          className="flex w-full overflow-scroll"
        >
          {gardens.map((garden) => (
            <div key={garden.id} style={styles.card} className="mr-4">
              <img
                src={garden.image_url}
                alt={garden.name}
                style={styles.img}
                width={170}
                height={170}
              />
              <h3>{garden.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyGardensCarousel;
