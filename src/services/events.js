import { get, post, put } from './api';

export const fetchEvents = () => get('events');

export const createEvent = data => post('events', { ...data });

export const updateEvent = data => put(
  `events/${data.id}`,
  { ...data }
);

export const searchEvents = query => get('events/search', { query });
