import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchGardens } from '../../features/garden/gardensSlice';

const MyGardensCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gardens, loading, error } = useSelector((state) => state.gardens);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3; // Number of cards to show at once

  useEffect(() => {
    dispatch(fetchGardens());
  }, [dispatch]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % gardens.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + gardens.length) % gardens.length
    );
  };

  if (loading) return <p>Loading gardens...</p>;
  if (error) return <p>Error loading gardens: {error}</p>;

  const styles = {
    carouselContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      width: '100%',
    },
    carousel: {
      overflow: 'hidden',
      width: '80%',
    },
    carouselItems: {
      display: 'flex',
      transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
      transition: 'transform 0.3s ease-in-out',
    },
    card: {
      minWidth: `${100 / itemsToShow}%`,
      cursor: 'pointer',
      padding: '10px',
      borderRadius: '12px',
      backgroundColor: '#f4f4f4', // surface-100 equivalent
    },
    img: {
      width: '100%',
      borderRadius: '12px',
      height: 'auto',
    },
    button: {
      background: 'none',
      border: 'none',
      fontSize: '2rem',
      cursor: 'pointer',
    },
  };

  return (
    <div style={{ padding: '10px' }}>
      <h2 style={{ marginBottom: '20px' }}>Go to My Gardens</h2>
      <div style={styles.carouselContainer}>
        <button style={styles.button} onClick={handlePrev}>
          ◀
        </button>
        <div style={styles.carousel}>
          <div style={styles.carouselItems}>
            {gardens
              .slice(currentIndex, currentIndex + itemsToShow)
              .map((garden) => (
                <div
                  key={garden.id}
                  style={styles.card}
                  onClick={() => navigate(`/my-gardens`)}
                >
                  <img
                    src={garden.image_url}
                    alt={garden.name}
                    style={styles.img}
                  />
                  <h3>{garden.name}</h3>
                </div>
              ))}
          </div>
        </div>
        <button style={styles.button} onClick={handleNext}>
          ▶
        </button>
      </div>
    </div>
  );
};

export default MyGardensCarousel;
