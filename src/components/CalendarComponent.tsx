import { Calendar } from "antd";
import React from "react";
import { IEvent } from "../models/IEvent";
import type { Dayjs } from "dayjs";
import { DeleteFilled  } from "@ant-design/icons";

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
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <div>{ev.description}</div>
            <DeleteFilled 
              style={{ marginLeft: "8px", cursor: "pointer" }}
              onClick={() => deleteEvent(ev)}
            />
          </div>
        ))}
      </div>
    );
  };

  return <Calendar cellRender={dateCellRender} />;
};

export default CalendarComponent;
