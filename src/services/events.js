import { get, post, put, del } from './api';

export const fetchEvents = () => get('events');

export const createEvent = data => post('events', { ...data });

export const updateEvent = data => put(
  `events/${data.id}`,
  { ...data }
);

export const deleteEvent = data => del(`events/${data.id}`);

export const searchEvents = query => get('events/search', { query });
