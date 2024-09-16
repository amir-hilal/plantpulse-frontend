import React from 'react';
import WateringSchedules from '../components/common/WateringSchedules';
import WeeklyCalendar from '../components/common/WeeklyCalendar';
import { format } from 'date-fns';

const CalendarPage = () => {
  const today = new Date();
  const formattedDate = format(today, 'EEEE, M/d/yyyy'); // "Monday, 9/16/2024"

  return (
    <div className="p-4 flex flex-column align-items-center">
      {/* Today's Watering Schedule */}
      <h3 className='mt-0 text-secondary'>{formattedDate}</h3>
      <section className="px-2 md:px-4 lg:px-4 py-4 mx-2 md:mx-4 lg:mx-8 h-17rem bg-tint-5 border-round-xl mb-3 overflow-x-auto w-full">
        <WateringSchedules />
      </section>

      {/* Weekly Calendar */}
      <section className="bg-transparent p-4 mx-2 md:mx-4 lg:mx-8 border-round-xl w-full">
        <WeeklyCalendar />
      </section>
    </div>
  );
};

export default CalendarPage;
