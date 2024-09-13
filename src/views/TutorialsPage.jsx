import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import TutorialCard from '../components/common/TutorialCard';
import {
  fetchTutorials,
  resetTutorials,
  searchTutorials,  // Create a searchTutorials action in your Redux slice
} from '../features/tutorials/tutorialsSlice';

const Tutorials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const { tutorials, loading, currentPage, hasMore } = useSelector(
    (state) => state.tutorials
  );

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      // If no search query, reset tutorials and fetch all
      dispatch(resetTutorials());
      dispatch(fetchTutorials(1));
    } else {
      // Debounced search to avoid excessive requests
      const debouncedSearch = debounce(() => {
        dispatch(resetTutorials());
        dispatch(searchTutorials({ query: searchQuery, page: 1 }));
      }, 1000);
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };
    }
  }, [dispatch, searchQuery]);

  // Handle infinite scroll
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      fetching
    ) {
      return;
    }
    if (hasMore && !loading) {
      setFetching(true);
      const nextPage = currentPage + 1;
      if (!searchQuery) {
        dispatch(fetchTutorials(nextPage)).then(() => {
          setFetching(false);
        });
      } else {
        dispatch(searchTutorials({ query: searchQuery, page: nextPage })).then(() => {
          setFetching(false);
        });
      }
    }
  }, [dispatch, fetching, currentPage, hasMore, loading, searchQuery]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Determine if the content is empty
  const isEmpty = !loading && tutorials.length === 0;
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-column justify-content-center mt-3 px-8">
      <div className="w-full flex justify-content-between mb-3 align-items-center">
        <h2 className="text-center m-0">Gardening Tutorials</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for tutorials"
          className="py-2 pr-8 pl-6 surface-100 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
        />
      </div>

      {isEmpty && (
        <div className="flex flex-column align-items-center justify-content-center mt-5">
          <h4>No tutorials found. Please check back later.</h4>
        </div>
      )}

      <div className="lg:gap-1 grid grid-nogutter p-0 justify-content-between">
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
