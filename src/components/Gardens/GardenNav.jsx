import React, { useState } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FiEdit, FiPlus } from 'react-icons/fi';
import { GiPlantSeed } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { deleteGarden } from '../../features/garden/gardensSlice';
import ConfirmationModal from '../common/ConfirmationModal';

const GardenNav = ({
  gardens,
  selectedGardenId,
  onSelectGarden,
  onAddGarden,
  onEditGarden,
}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [hoveredGardenId, setHoveredGardenId] = useState(null);

  const handleDelete = (garden) => {
    setItemToDelete(garden); // Set the item you want to delete
    setIsModalOpen(true); // Open the modal
  };
  const handleConfirmDelete = () => {
    if (itemToDelete.id === selectedGardenId) {
      onSelectGarden(null);
    }
    dispatch(deleteGarden(itemToDelete.id));

    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };
  return (
    <div className="text-xs lg:text-base mt-5 m-0 h-screen w-full">
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
            <GiPlantSeed className="hidden md:block mr-2" />
            <span className="ml-3 md:ml-1 lg:ml-4 ">{garden.name}</span>

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
                    e.stopPropagation();
                    handleDelete(garden); // Prevent triggering onSelectGarden
                  }}
                >
                  <FaRegTrashCan className="text-xl " />
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete?`}
      />
    </div>
  );
};

export default GardenNav;
