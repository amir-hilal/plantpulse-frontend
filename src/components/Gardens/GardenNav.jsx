import React from 'react';
import { FiPlus } from "react-icons/fi";
const GardenNav = ({ gardens, selectedGardenId, onSelectGarden }) => {
  return (
    <div className=' pl-2 mt-5 m-0 h-screen'>
      <ul className=" list-none p-0 m-0">
        <li className='cursor-pointer mb-3 p-2 pl-4 border-round-left-3xl flex align-items-center justify-content-between' >My Gardens <span><FiPlus /></span></li>
        {gardens.map((garden) => (
          <li
            key={garden.id}
            className={`list-item cursor-pointer mb-3 p-2 pl-4 border-round-left-3xl bg-secondary border text-tint-5 border-solid border-secondary  border-right-none ${
              garden.id === selectedGardenId ? 'bg-tint-4 text-color-secondary' : ''
            }`}
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
