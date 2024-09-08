import React, { useState } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FiEdit, FiPlus } from 'react-icons/fi';
import { GiPlantSeed } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { deleteGarden } from '../../features/garden/gardensSlice';

const GardenNav = ({
  gardens,
  selectedGardenId,
  onSelectGarden,
  onAddGarden,
  onEditGarden,
}) => {
  const dispatch = useDispatch();

  const [hoveredGardenId, setHoveredGardenId] = useState(null);

  return (
    <div className="text-xs sm:text-base mt-5 m-0 h-screen w-full">
      <ul className="list-none p-0 m-0 pl-2">
        <li
          className="cursor-pointer mb-3 p-2 sm:pl-4 border-round-left-3xl flex align-items-center justify-content-between"
          onClick={() => onAddGarden()}
        >
          My Gardens
          <span>
            <FiPlus className="text-xl" />
          </span>
        </li>
        {gardens.map((garden) => (
          <li
            key={garden.id}
            className={`relative h-3rem cursor-pointer mb-3 p-2 sm:pl-4 border-round-left-3xl flex align-items-center bg-secondary text-tint-5 border-solid border-secondary border-right-none ${
              garden.id === selectedGardenId
                ? ' bg-tint-4 text-color-secondary'
                : ''
            }`}
            onMouseEnter={() => setHoveredGardenId(garden.id)}
            onMouseLeave={() => setHoveredGardenId(null)}
            onClick={() => onSelectGarden(garden.id)}
          >
            <GiPlantSeed className="mr-2" />
            <span className="sm:ml-1 md:ml-5 ">{garden.name}</span>

            {hoveredGardenId === garden.id && (
              <div className="m-0 p-0 flex align-items-center">
                <span
                  className={`absolute right-0 p-2 cursor-pointer ${
                    garden.id === selectedGardenId
                      ? 'bg-tint-4'
                      : 'bg-secondary'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering onSelectGarden
                    onEditGarden(garden);
                  }}
                >
                  <FiEdit className="text-xl " />
                </span>
                <span
                  className={`absolute right-0 p-2 mr-5 cursor-pointer ${
                    garden.id === selectedGardenId
                      ? 'bg-tint-4'
                      : 'bg-secondary'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering onSelectGarden
                    dispatch(deleteGarden(garden.id)); // Dispatch the delete action
                  }}
                >
                  <FaRegTrashCan className="text-xl " />
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GardenNav;
