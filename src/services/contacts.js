import { get, post, del } from './api';

export const fetchContacts = () => get('members/me/contacts');

export const addContact = member => post(
  'members/me/contacts',
  {
    memberId: member.id
  }
);
export const removeContact = memberId => del(`members/me/contacts/${memberId}`);

export const fetchFavorites = () => get('members/me/favorites');

export const addFavorite = member => post(
  'members/me/favorites',
  {
    memberId: member.id
  }
);

export const removeFavorite = memberId => del(`members/me/favorites/${memberId}`);

export const searchContacts = query => get('members/search', { query, email: query });
