import { get } from './api';

export const getTripTypes = () => get('categories/trip');
export const getAccommodationTypes = () => get('categories/accommodation');
export const getActivityTypes = () => get('categories/event');
