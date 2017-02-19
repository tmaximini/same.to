import { post, put, del } from './api';

export const createTrip = (data, eventId) => post(`events/${eventId}/trips`, { ...data });

export const updateTrip = data => put(
  `events/${data.eventId}/trips/${data.id}`,
  { ...data }
);

export const deleteTrip = data => del(`events/${data.eventId}/trips/${data.id}`);
