import { get, post, del } from './api';

export const fetchContacts = () => get('members/me/contacts');

export const addContact = data => post(
  'members/me/contacts',
  { ...data }
);
export const removeContact = memberId => del(`members/me/contacts/${memberId}`);

export const fetchFavorites = () => get('members/me/favorites');

export const addFavorite = memberId => post(
  'members/me/favorites',
  {
    memberId
  }
);

export const removeFavorite = memberId => del(`members/me/favorites/${memberId}`);
