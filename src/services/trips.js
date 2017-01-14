import { post, put } from './api';

export const createTrip = data => post(`events/${data.eventId}/trips`, { ...data });

export const updateTrip = data => put(
  `events/${data.eventId}/trips/${data.id}`,
  { ...data }
);
