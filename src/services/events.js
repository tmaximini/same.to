import { get, post } from './api';

export const fetchEvents = () => get('events');

export const createEvent = data => post('events', { ...data });
