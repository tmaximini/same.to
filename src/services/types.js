import { get } from './api';

export const getTripTypes = () => get('types/trip');
export const getAccommodationTypes = () => get('types/accommodation');
export const getActivityTypes = () => get('types/event');
