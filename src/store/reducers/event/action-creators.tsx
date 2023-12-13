import axios from "axios";
import { AppDispatch } from "../..";
import UserService from "../../../api/UserService";
import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/IUser";
import { EventActionEnum, SetEventsState, SetGuestsState } from "./types";

export const EventActionCreators = {
  setGuests: (payload: IUser[]): SetGuestsState => ({
    type: EventActionEnum.SET_GUESTS,
    payload,
  }),
  setEvents: (payload: IEvent[]): SetEventsState => ({
    type: EventActionEnum.SET_EVENTS,
    payload,
  }),
  fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
      setTimeout(async () => {
        const guests = await UserService.getUsers();
        dispatch(EventActionCreators.setGuests(guests.data));
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  },
  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as IEvent[];
      json.push(event);
      dispatch(EventActionCreators.setEvents(json));
      localStorage.setItem("events", JSON.stringify(json));
    } catch (e) {
      console.log(e);
    }
  },
  deleteEvent: (deletedEvent: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as IEvent[];
      const filteredEvents = json.filter(
        (event) => JSON.stringify(event) !== JSON.stringify(deletedEvent)
      );
      dispatch(EventActionCreators.setEvents(filteredEvents));
      localStorage.setItem("events", JSON.stringify(filteredEvents));
    } catch (e) {
      console.log(e);
    }
  },
  fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as IEvent[];
      const currentUsersEvents = json.filter(
        (event) => event.guest === username || event.author === username
      );
      dispatch(EventActionCreators.setEvents(currentUsersEvents));
    } catch (e) {
      console.log(e);
    }
  },
};
