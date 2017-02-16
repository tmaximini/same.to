import { get, post, put } from './api';

export const getProfile = id => (id ? get(`members/${id}`) : get('members/me'));

export const createProfile = data => post('members', { ...data });

export const updateProfile = data => put(
  'members/me',
  { ...data }
);
