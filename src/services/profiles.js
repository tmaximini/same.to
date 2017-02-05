import { post, put } from './api';

export const createProfile = data => post('members', { ...data });

export const updateProfile = data => put(
  `members/${data.id}`,
  { ...data }
);
