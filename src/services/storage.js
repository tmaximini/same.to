import { AsyncStorage } from 'react-native';

export const getItem = key => AsyncStorage.getItem(key)
  .then(item => item)
  .catch(error => new Error(error));

export const setItem = (key, value) => AsyncStorage.setItem(key, value)
  .then(item => item)
  .catch(error => new Error(error));

export const removeItem = key => AsyncStorage.removeItem(key)
  .then(item => item)
  .catch(error => new Error(error));

export const multiGet = (keys = []) => new Promise((resolve, reject) => {
  AsyncStorage.multiGet(keys, (err, stores) => {
    if (err) reject(err);
    resolve(stores);
  });
});

export const multiSet = (keyValPairs = []) => new Promise((resolve, reject) => {
  AsyncStorage.multiSet(keyValPairs, (err) => {
    if (err) {
      console.error('error using multiset ', err);
      reject(err);
    } else {
      console.info('multiset successful.');
      resolve();
    }
  });
});

