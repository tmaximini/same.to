import { post, put } from './api';

export const createActivity = (data, eventId) => post(
  `events/${eventId}/activities`,
  { ...data }
);

export const updateActivity = data => put(
  `events/${data.eventId}/activities/${data.id}`,
  { ...data }
);
