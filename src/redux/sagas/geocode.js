import { Actions } from 'react-native-router-flux';
import { call, put } from 'redux-saga/effects';
import Geocoder from 'react-native-geocoder';
import { updateAuthHeader } from '../../services/api';

export default function* geocodeAsync(action) {
  const { location, successAction, errorAction } = action.payload;
  try {
    const response = yield call(Geocoder.geocodeAddress, location);
    if (response.error) {
      // in case of error
      yield put({
        type: errorAction,
        payload: {
          error: response.error ? response.error : response,
          location
        }
      });
      if (response.error.statusCode === 401) {
        updateAuthHeader(null);
        Actions.login();
      }
    } else {
      // success
      console.info('geocode success!', response);
      yield put({
        type: successAction,
        payload: response[0] // response is an array
      });
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: errorAction,
      payload: {
        error: error.code || error.message,
        location
      }
    });
  }
}
