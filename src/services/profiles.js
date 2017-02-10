import RNFetchBlob from 'react-native-fetch-blob';
// import _ from 'lodash';
import { get, post, put, getAuthToken, API_BASE } from './api';

export const getProfile = id => (
  id ?
  get(`members/${id}`) :
  get('members/me')
);

export const createProfile = data => post('members', { ...data });

export const updateProfile = data => put(
  'members/me',
  { ...data }
);

export const uploadImage = imgObj => {
  console.log('imgObj', imgObj);
  return RNFetchBlob.fetch('POST', `${API_BASE}members/me/upload`, {
    Authorization: getAuthToken(),
    'Content-Type': 'multipart/form-data',
  }, [{
    name: 'avatar',
    filename: imgObj.fileName,
    type: 'image/jpeg',
    data: RNFetchBlob.wrap(imgObj.origURL),
  }]).then((resp) => {
    console.info('upload success', resp);
  }).catch((err) => {
    console.error('upload error', err);
  });
};

// export const uploadImage = imgObj => {
//   let data = new FormData();
//   if (imgObj.uri) {
//     data.append('image', { uri: imgObj.origURL, name: imgObj.fileName, type: 'image/jpg' });
//   }

//   let xhr = new XMLHttpRequest();
//   xhr.open('POST', `${API_BASE}members/me/upload`);
//   xhr.setRequestHeader('Authorization', getAuthToken());
//   xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d');
//   xhr.setRequestHeader('Accept', 'application/json');
//   // let formdata = new FormData();
//   // image from CameraRoll.getPhotos(
//   // formdata.append('image', { ...imgObj, name: 'image.jpg', type: 'image/jpeg' });
//   xhr.send(data);


//   // console.info('data', data);
//   // const config = {
//   //   method: 'POST',
//   //   headers: {
//   //     Accept: 'application/json',
//   //     'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
//   //     Authorization: getAuthToken(),
//   //   },
//   //   body: { ...data },
//   // };
//   // return fetch(`${API_BASE}members/me/upload`, config)
//   //   .then(response => response.json())
//   //   .catch(err => console.log('error', err));
// };
