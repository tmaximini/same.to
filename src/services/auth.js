
import { post } from './api';

export const register = (...data) => post('members', { ...data });

export const login = credentials => post('members/login', { ...credentials });
