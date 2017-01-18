import { get, post } from './api';

export const fetchContacts = () => get('contacts');

export const createContact = data => post('contacts', { ...data });
