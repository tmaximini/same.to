import RNFetchBlob from 'react-native-fetch-blob';
import { get, post, put, API_BASE, getAuthToken } from './api';

export const getProfile = id => (id ? get(`members/${id}`) : get('members/me'));

export const createProfile = data => post('members', { ...data });

export const updateProfile = data => put(
  'members/me',
  { ...data }
);

export const uploadImage = (imgObj, callback) => {
  return RNFetchBlob.fetch('POST', `${API_BASE}members/me/upload`, {
    Authorization: getAuthToken(),
    'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
  }, [{
    name: 'file',
    filename: imgObj.fileName,
    type: 'image/jpeg',
    data: imgObj.data,
  }]).then((resp) => {
    console.info('upload success', resp);
    callback();
  }).catch((err) => {
    console.error('upload error', err);
  });
};


