import React, { useEffect, useState } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import TutorialCard from '../components/common/TutorialCard';
import {
  fetchTutorials,
  resetTutorials,
} from '../features/tutorials/tutorialsSlice';

const Tutorials = () => {
  const dispatch = useDispatch();
  const { tutorials, loading, currentPage, hasMore } = useSelector(
    (state) => state.tutorials
  );

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    dispatch(resetTutorials());
    dispatch(fetchTutorials(1));
  }, [dispatch]);

  // Handle infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        fetching
      ) {
        return;
      }
      if (hasMore && !loading) {
        setFetching(true);
        dispatch(fetchTutorials(currentPage)).then(() => {
          setFetching(false);
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetching, currentPage, hasMore, loading, dispatch]);

  // Determine if the content is empty
  const isEmpty = !loading && tutorials.length === 0;

  return (
    <div className="flex flex-column justify-content-center mt-4">
      <div className="w-full">
        <h2 className="text-center m-0">Gardening Tutorials</h2>
      </div>

      {isEmpty && (
        <div className="flex flex-column align-items-center justify-content-center mt-5">
          <h4>No tutorials found. Please check back later.</h4>
        </div>
      )}

      <div className="lg:gap-1 grid grid-nogutter p-0 justify-content-between p-3">
        {tutorials.map((tutorial) => (
          <TutorialCard key={tutorial.id} tutorial={tutorial} />
        ))}
      </div>

      {loading && (
        <div className="w-full flex text-center align-items-center justify-content-center h-30rem mt-3">
          <Loading type="spin" color="#019444" height={50} width={50} />
        </div>
      )}

      {!hasMore && !loading && tutorials.length > 0 && (
        <div className="text-center">
          <h4>You have reached the end of the content.</h4>
        </div>
      )}
    </div>
  );
};

export default Tutorials;
