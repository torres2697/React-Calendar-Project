import { Calendar } from "antd";
import React from "react";
import { IEvent } from "../models/IEvent";
import type { Dayjs } from "dayjs";

interface CalendarComponentProps {
  events: IEvent[];
  deleteEvent: (event: IEvent) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  events,
  deleteEvent,
}) => {
  const dateCellRender = (value: Dayjs) => {
    const currentDayEvents = events.filter(
      (ev) => ev.date === value.format("YYYY-MM-DD")
    );
    return (
      <div>
        {currentDayEvents.map((ev, index) => (
          <div onClick={() => deleteEvent(ev)} key={index}>
            {ev.description}{" "}
          </div>
        ))}
      </div>
    );
  };

  return <Calendar cellRender={dateCellRender} />;
};

export default CalendarComponent;
