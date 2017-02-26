
import DeviceInfo from 'react-native-device-info';
import { get, post, getFcmToken } from './api';

export const register = data => post('members', { ...data });

export const login = credentials => post(
  'members/login',
  {
    ...credentials,
    fcmToken: getFcmToken(),
    deviceId: DeviceInfo.getUniqueID(),
  }
);

export const loginFacebook = ({ access_token }) => get('members/login-facebook', { access_token });
