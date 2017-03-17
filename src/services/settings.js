import { post } from './api';

export const sendFeedback = message => post('messages/feedback', { message });
