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


// export const uploadImage2 = imgObj => {
//   const data = new FormData();
//   if (imgObj.uri) {
//     data.append('image', { uri: imgObj.uri, name: imgObj.fileName, type: 'image/jpg' });
//   }
//   const xhr = new XMLHttpRequest();
//   xhr.open('POST', `${API_BASE}members/me/upload`);
//   xhr.setRequestHeader('Authorization', getAuthToken());
//   xhr.setRequestHeader('Content-Type', 'multipart/form-data;charset=utf-8;boundary=6ff46e0b6b5148d984f148b6542e5a5d');
//   xhr.setRequestHeader('Accept', 'application/json');
//   xhr.send(JSON.stringify(data));
// };


// export const uploadImage = imgObj => {
//   const formData = new FormData();
//   formData.append('image', { uri: imgObj.origURL, name: imgObj.fileName });
//   // formData.append('description', String(data.description));

//   const options = {
//     headers: {
//       'Content-Type': 'multipart/form-data; boundary=--gc0p4Jq0M2Yt08jU534c0p--',
//       Authorization: getAuthToken(),
//     },
//     body: formData,
//     method: 'POST',
//   };
//   return fetch(`${API_BASE}members/me/upload`, options)
//     .then((response) => {
//       console.log('response', response);
//     })
//     .catch(err => console.info({ err }));
// };
