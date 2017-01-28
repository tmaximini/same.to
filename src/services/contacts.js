import { get, post, getUserId } from './api';

export const fetchContacts = () => get(`members/${getUserId()}/contacts`);

export const createContact = data => post(
  `members/${getUserId()}/contacts`,
  { ...data }
);
