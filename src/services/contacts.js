import { get, post, del } from './api';

export const fetchContacts = () => get('members/me/contacts');

export const addContact = member => post(`members/${member.id}/contacts`);

export const acceptContact = member =>
  post(`members/me/contacts/${member.id}/accept`);

export const declineContact = member =>
  post(`members/me/contacts/${member.id}/decline`);

export const removeContact = memberId => del(`members/me/contacts/${memberId}`);

export const fetchFavorites = () => get('members/me/favorites');

export const addFavorite = member =>
  post('members/me/favorites', {
    memberId: member.id
  });

export const removeFavorite = memberId =>
  del(`members/me/favorites/${memberId}`);

export const searchContacts = query => get('members/search', { query });

export const searchFavorites = searchData =>
  get('members/search', { ...searchData });
