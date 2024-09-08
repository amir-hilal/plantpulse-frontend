import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { GiPlantSeed } from 'react-icons/gi'; // Example icon for garden
const GardenNav = ({ gardens, selectedGardenId, onSelectGarden }) => {
  return (
    <div className="text-xs sm:text-base mt-5 m-0 h-screen w-full">
      <ul className="list-none p-0 m-0 pl-2">
        <li className="cursor-pointer mb-3 p-2 sm:pl-4 border-round-left-3xl flex align-items-center justify-content-between">
          My Gardens
          <span>
            <FiPlus />
          </span>
        </li>
        {gardens.map((garden) => (
          <li
            key={garden.id}
            className={`cursor-pointer mb-3 p-2 sm:pl-4 border-round-left-3xl flex align-items-center  bg-secondary text-tint-5 border-solid border-secondary border-right-none ${
              garden.id === selectedGardenId
                ? ' bg-tint-4 text-color-secondary'
                : ''
            }`}
            onClick={() => onSelectGarden(garden.id)}
          >
            <GiPlantSeed className=" mr-2" />
            <span className='sm:ml-1 md:ml-5'>{garden.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GardenNav;
