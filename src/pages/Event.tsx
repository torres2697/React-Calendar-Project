import { Button, Row } from "antd";
import Layout from "antd/es/layout/layout";
import Modal from "antd/es/modal/Modal";
import React, { FC, useEffect, useState } from "react";
import CalendarComponent from "../components/CalendarComponent";
import CalendarFrom from "../components/CalendarForm";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";

const Event = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { fetchGuests, createEvent, fetchEvents, deleteEvent } = useActions();
  const { guests, events } = useTypedSelector((state) => state.events);
  const { user } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
  }, []);

  const addNewEvent = (event: IEvent) => {
    setModalVisible(false);
    createEvent(event);
  };

  return (
    <Layout>
      <CalendarComponent events={events} deleteEvent={deleteEvent} />
      <Row justify="center">
        <Button onClick={() => setModalVisible(true)}>Add Event</Button>
      </Row>
      <Modal
        onCancel={() => setModalVisible(false)}
        footer={null}
        title="Add event"
        open={modalVisible}
      >
        <CalendarFrom guests={guests} submit={addNewEvent} />
      </Modal>
    </Layout>
  );
};

export default Event;
