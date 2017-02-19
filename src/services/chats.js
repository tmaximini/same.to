import { get, post, put, del } from './api';

export const fetchChats = () => get('conversations');

export const createChat = data => post('conversations', { ...data });

export const updateChat = data => put(`conversations/${data.id}`, { ...data });

export const deleteChat = data => del(`conversations/${data.id}`);

export const fetchMessages = chatId => get(
  `conversations/${chatId}/messages`
);

export const postMessage = chatId => post(
  `conversations/${chatId}/messages`
);

