import { post, put } from './api';

export const createAccommodation = data => post(
  `events/${data.eventId}/accommodations`,
  { ...data }
);

export const updateAccommodation = data => put(
  `events/${data.eventId}/accommodations/${data.id}`,
  { ...data }
);
