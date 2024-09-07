import React, { useState } from 'react';
import { Tooltip } from 'primereact/tooltip'; // Optional if you want tooltips
import { Button } from 'primereact/button';

const PlantCard = ({ plant }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="p-col-12 p-md-4 p-lg-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="p-card p-shadow-3 p-p-3 p-border-round">
        {/* Plant Image */}
        <div className="p-d-flex p-jc-center">
          <img
            src={plant.image_url || '/default-plant-image.png'}
            alt={plant.name}
            className="p-shadow-2 p-border-round p-mb-3"
            style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
          />
        </div>

        {/* Plant Details */}
        <div className="p-d-flex p-jc-between p-ai-center">
          <div className="p-d-flex p-flex-column">
            <span className="p-text-bold">{plant.name}</span>
            <span className="p-text-secondary">{plant.age} years old</span>
          </div>

          {/* Timeline Button */}
          <Button
            label="See Timeline"
            icon="pi pi-clock"
            className="p-button-outlined p-button-sm"
            onClick={() => console.log('Go to timeline')}
          />
        </div>

        <div className="p-d-flex p-jc-between p-mt-3">
          <span className={`p-tag ${plant.health_status === 'Healthy' ? 'p-tag-success' : 'p-tag-warning'}`}>
            {plant.health_status}
          </span>
          <span className="p-tag p-tag-info">{plant.category}</span>
        </div>

        <div className="p-d-flex p-jc-between p-mt-2">
          <div>
            <p className="p-text-sm">
              Last Time Watered: <strong>{plant.last_watered}</strong>
            </p>
            <p className="p-text-sm">
              Next Watering: <strong>{plant.next_watering}</strong>
            </p>
          </div>
        </div>

        {/* Hover Info */}
        {hovered && (
          <div className="p-p-2 p-mt-2 p-border-round p-shadow-2 p-flex-column" style={{ background: '#e0f4e8' }}>
            <p>
              <strong>Height:</strong> {plant.height ? `${plant.height} cm` : 'Not specified'}
            </p>
            <p>
              <strong>Important Note:</strong> {plant.important_note || 'No important notes'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantCard;
