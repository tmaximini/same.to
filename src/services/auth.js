
import { get, post } from './api';

export const register = (...data) => post('members', { ...data });

export const login = credentials => post('members/login', { ...credentials });

export const loginFacebook = ({ access_token }) => get('members/login-facebook', { access_token });
