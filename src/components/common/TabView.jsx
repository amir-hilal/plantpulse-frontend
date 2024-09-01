import React, { useState } from 'react';

const TabView = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabview-container">
      <div className="tab-buttons flex">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button p-2 bg-white w-3 ${
              activeTab === index ? 'border-bottom-2 text-primary border-primary font-bold' : ' text-primary'
            } border-none cursor-pointer w-full`}
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
