import React from 'react';

const GardenNav = ({ gardens, selectedGardenId, onSelectGarden }) => {
  return (
    <div className="garden-nav">
      <ul className="p-list">
        {gardens.map((garden) => (
          <li
            key={garden.id}
            className={`p-list-item cursor-pointer ${garden.id === selectedGardenId ? 'bg-primary text-white' : ''}`}
            onClick={() => onSelectGarden(garden.id)}
          >
            {garden.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GardenNav;
