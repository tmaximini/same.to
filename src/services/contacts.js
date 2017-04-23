import { get, post, del } from './api';

export const fetchContacts = () => get('members/me/contacts');

// @change: changed api endpoint to support contact request
export const addContact = member => post(
  `members/${member.id}/contacts`,
);

// @change: new api endpoint for accept contact-request
export const acceptContactRequest = member => post(
  `members/me/contacts${member.id}/accept`,
);

// @change: new api endpoint for accept contact-request
export const declineContactRequest = member => post(
  `members/me/contacts${member.id}/decline`,
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

export const searchContacts = query => get(
  'members/search',
  { query }
);

export const searchFavorites = searchData => get(
  'members/search',
  { ...searchData }
);
