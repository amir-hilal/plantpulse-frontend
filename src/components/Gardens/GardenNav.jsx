import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { GiPlantSeed } from 'react-icons/gi'; // Example icon for garden
import './GardenNav.css';
const GardenNav = ({ gardens, selectedGardenId, onSelectGarden }) => {
  return (
    <div className="garden-nav mt-5 m-0 h-screen w-full">
      <ul className="list-none p-0 m-0 pl-2">
        <li className="cursor-pointer mb-3 p-2 pl-4 border-round-left-3xl flex align-items-center justify-content-between">
          My Gardens
          <span>
            <FiPlus />
          </span>
        </li>
        {gardens.map((garden) => (
          <li
            key={garden.id}
            className={`list-item cursor-pointer mb-3 p-2 pl-4 border-round-left-3xl bg-secondary border text-tint-5 border-solid border-secondary border-right-none flex align-items-center ${
              garden.id === selectedGardenId
                ? 'bg-tint-4 text-color-secondary'
                : ''
            }`}
            onClick={() => onSelectGarden(garden.id)}
          >
            <GiPlantSeed className="garden-icon mr-2" />{' '}
            {/* Icon for each garden */}
            <span className="garden-name">{garden.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GardenNav;
