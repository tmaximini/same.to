import { get, post } from './api';

export const createEventInvite = eventId => post(
  `events/${eventId}/invite`,
  { type: 'app' }
);


