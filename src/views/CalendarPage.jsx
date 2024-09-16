import React from 'react';
import WateringSchedules from '../components/common/WateringSchedules';
import WeeklyCalendar from '../components/common/WeeklyCalendar';

const CalendarPage = () => {
  return (
    <div className="p-4">
      {/* Today's Watering Schedule */}
      <section className="px-2 md:px-4 lg:px-4 py-4 mx-2 md:mx-4 lg:mx-8 h-21rem bg-tint-5 border-round-xl mb-5 overflow-x-auto">
        <WateringSchedules />
      </section>

      {/* Weekly Calendar */}
      <section className="bg-tint-2 p-4 mx-2 md:mx-4 lg:mx-8 border-round-xl mb-5">
        <WeeklyCalendar />
      </section>
    </div>
  );
};

export default CalendarPage;
