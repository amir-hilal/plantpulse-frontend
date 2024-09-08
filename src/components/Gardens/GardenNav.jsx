import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { GiPlantSeed } from 'react-icons/gi';

const GardenNav = ({ gardens, selectedGardenId, onSelectGarden, onAddGarden }) => {
  return (
    <div className="grid m-0">
      <ul className="list-none p-0">
        <li
          onClick={onAddGarden} // Trigger modal on click
          className="flex align-items-center justify-content-between"
        >
          <span>My Gardens</span>
          <FiPlus />
        </li>
        {gardens.map((garden) => (
          <li
            key={garden.id}
            className={`flex align-items-center ${
              garden.id === selectedGardenId ? 'text-bold' : ''
            }`}
            onClick={() => onSelectGarden(garden.id)}
          >
            <GiPlantSeed />
            <span>{garden.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GardenNav;
