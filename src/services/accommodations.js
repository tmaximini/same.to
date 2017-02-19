import { post, put, del } from './api';

export const createAccommodation = (data, eventId) => post(
  `events/${eventId}/accommodations`,
  { ...data }
);

export const updateAccommodation = data => put(
  `events/${data.eventId}/accommodations/${data.id}`,
  { ...data }
);

export const deleteAccommodation = data => del(`events/${data.eventId}/accommodations/${data.id}`);
