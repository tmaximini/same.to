import { get } from './api';

export const fetchEvents = () => get('events');

export const login = (credentials) => post('members/login', { ...credentials });
