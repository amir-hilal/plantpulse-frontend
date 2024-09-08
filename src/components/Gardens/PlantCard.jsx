import React from 'react';

const PlantCard = ({ plant }) => {
  return (
    <div className="col-12 md-6 lg-3">
      <div className="border-round-lg shadow-1 surface-card p-3">
        <img src={plant.image_url} alt={plant.name} className="w-full border-round mb-3" />
        <div className="text-xl font-bold">{plant.name}</div>
        <div className="text-md text-secondary">Age: {plant.age} years old</div>
        <div className="text-md">Category: {plant.category}</div>
        <div className={`text-md ${plant.health_status === 'Healthy' ? 'text-success' : 'text-error'}`}>
          {plant.health_status}
        </div>
        <div className="text-sm">Last Watered: {plant.last_time_watered}</div>
        <div className="text-sm">Next Watering: {plant.next_time_to_water}</div>
        <button className="mt-2 p-button">See Timeline</button>
      </div>
    </div>
  );
};

export default PlantCard;
