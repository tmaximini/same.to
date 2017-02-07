import { get, del } from './api';

export const joinEvent = eventId => get(
  `events/${eventId}/join`
);

export const joinTrip = (eventId, id) => get(
  `events/${eventId}/trips/${id}/join`
);

export const joinAccommodation = (eventId, id) => get(
  `events/${eventId}/accommodations/${id}/join`
);

export const joinActivity = (eventId, id) => get(
  `events/${eventId}/activities/${id}/join`
);

export const leaveEvent = eventId => del(
  `events/${eventId}/leave`
);

export const leaveTrip = (eventId, id) => del(
  `events/${eventId}/trips/${id}/leave`
);

export const leaveAccommodation = (eventId, id) => del(
  `events/${eventId}/accommodations/${id}/leave`
);

export const leaveActivity = (eventId, id) => del(
  `events/${eventId}/activities/${id}/leave`
);
