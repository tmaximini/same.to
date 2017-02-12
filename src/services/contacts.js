import { get, post, del } from './api';

export const fetchContacts = () => get('members/me/contacts');

export const createContact = data => post(
  'members/me/contacts',
  { ...data }
);

export const fetchFavorites = () => get('members/me/favorites');

export const addToFavorites = memberId => post('members/me/favorites', {
  memberId
});

export const removeFromFavorites = memberId => del(`members/me/favorites/${memberId}`);
