import { get, post } from './api';

export const fetchContacts = () => get('members/me/contacts');

export const createContact = data => post(
  'members/me/contacts',
  { ...data }
);
