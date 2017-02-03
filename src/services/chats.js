import { get, post } from './api';

export const fetchChats = () => get('conversations');

export const createChat = data => post('conversations', { ...data });

export const fetchMessages = chatId => get(
  `conversations/${chatId}/messages`
);

export const postMessage = chatId => post(
  `conversations/${chatId}/messages`
);

