
import { post } from './api';

export const register = (...data) => post('members', { ...data });

export const login = (email, username) => post('members/login', { email, username });
