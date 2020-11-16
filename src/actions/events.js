import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventAddNew = event => ({
  type: types.eventAddNew,
  payload: event,
});

export const startEventAddNew = event => async (dispatch, getState) => {
  const { uid, name } = getState().auth;
  try {
    const resp = await fetchConToken("events", event, "POST");
    const body = await resp.json();

    if (body.ok) {
      event.id = body.evento.id;
      event.user = {
        _id: uid,
        name,
      };
      dispatch(eventAddNew(event));
    }
  } catch (error) {
    console.error(error);
  }
};

export const eventSetActive = event => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
});

export const startEventUpdate = event => async dispatch => {
  try {
    const resp = await fetchConToken(`events/${event.id}`, event, "PUT");
    const body = await resp.json();
    if (body.ok) {
      dispatch(eventUpdated(event));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  } catch (error) {
    console.error(error);
  }
};

export const eventUpdated = event => ({
  type: types.eventUpdated,
  payload: event,
});

export const startEventDelete = () => async (dispatch, getState) => {
  const { id } = getState().calendar.activeEvent;
  try {
    const resp = await fetchConToken(`events/${id}`, {}, "DELETE");
    const body = await resp.json();
    if (body.ok) {
      dispatch(eventDeleted());
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  } catch (error) {
    console.error(error);
  }
};

const eventDeleted = () => ({
  type: types.eventDeleted,
});

export const eventsStartLoading = () => async dispatch => {
  try {
    const response = await fetchConToken("events");
    const { eventos } = await response.json();
    
    dispatch(eventsLoaded(prepareEvents(eventos)));
  } catch (error) {
    console.error(error);
  }
};

const eventsLoaded = events => ({
  type: types.eventsLoaded,
  payload: events,
});

export const eventsLogout = () => ({
  type: types.eventLogout,
})
