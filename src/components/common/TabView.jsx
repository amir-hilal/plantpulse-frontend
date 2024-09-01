import React, { useState } from 'react';

const TabView = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabview-container">
      <div className="tab-buttons flex">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button p-2 ${
              activeTab === index ? 'bg-primary text-tint-5' : 'bg-tint-5 text-primary'
            } border-none border-round cursor-pointer w-full`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content mt-4">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default TabView;
