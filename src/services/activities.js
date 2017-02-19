import { post, put, del } from './api';

export const createActivity = (data, eventId) => post(
  'events',
  {
    ...data,
    eventId,
  }
);

export const updateActivity = data => put(
  `events/${data.id}`,
  { ...data }
);

export const deleteActivity = data => del(`events/${data.id}`);
