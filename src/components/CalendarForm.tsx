import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import Card from "antd/es/card/Card";
import { rules } from "../utils/rules";
import { IUser } from "../models/IUser";
import { IEvent } from "../models/IEvent";
import type { DatePickerProps } from "antd";
import { useTypedSelector } from "../hooks/useTypedSelector";

interface CalendarFormProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

const CalendarFrom: React.FC<CalendarFormProps> = (props) => {
  const [event, setEvent] = useState<IEvent>({
    author: "",
    description: "",
    date: "",
    guest: "",
  } as IEvent);

  const { user } = useTypedSelector((state) => state.auth);

  const onChangeDatePicker: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    setEvent({ ...event, date: dateString });
  };

  const submitFrom = () => {
    props.submit({ ...event, author: user.username });
  };

  return (
    <Card>
      <Form onFinish={submitFrom}>
        <Form.Item
          label="Event description"
          name="description"
          rules={[rules.required()]}
        >
          <Input
            value={event.description}
            onChange={(e) =>
              setEvent({ ...event, description: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="Event date"
          name="date"
          rules={[
            rules.required(),
            rules.isDateAfter("You can't choose the date in the past"),
          ]}
        >
          <DatePicker onChange={onChangeDatePicker} />
        </Form.Item>
        <Form.Item label="Choose guest" name="guest" rules={[rules.required()]}>
          <Select
            onChange={(guest: string) => setEvent({ ...event, guest })}
            options={[
              ...props.guests.map((guest) => ({
                key: guest.username,
                value: guest.username,
                label: guest.username,
              })),
            ]}
          />
        </Form.Item>
        <Row justify="end">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Card>
  );
};

export default CalendarFrom;
