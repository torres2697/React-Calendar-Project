import { Calendar } from "antd";
import React from "react";
import { IEvent } from "../models/IEvent";
import type { Dayjs } from "dayjs";

interface CalendarComponentProps {
  events: IEvent[];
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ events }) => {
  const dateCellRender = (value: Dayjs) => {
    const currentDayEvents = events.filter(
      (ev) => ev.date === value.format("YYYY-MM-DD")
    );
    return (
      <div>
        {currentDayEvents.map((ev, index) => (
          <div key={index}>{ev.description}</div>
        ))}
      </div>
    );
  };

  return <Calendar cellRender={dateCellRender} />;
};

export default CalendarComponent;
