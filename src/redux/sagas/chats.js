import { delay } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import {
  FETCH_CHATS_START,
  FETCH_CHATS_SUCCESS,
  FETCH_CHATS_ERROR,
  CREATE_CHAT_START,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_ERROR,
  UPDATE_REMOTE_CHAT_START,
  UPDATE_REMOTE_CHAT_SUCCESS,
  UPDATE_REMOTE_CHAT_ERROR,
  DELETE_CHAT_START,
  DELETE_CHAT_SUCCESS,
  DELETE_CHAT_ERROR,
} from '../modules/chats';
import {
  AUTHORIZATION_REQUIRED,
} from '../modules/auth';
import {
  fetchChats,
  createChat,
  updateChat,
  deleteChat,
} from '../../services/chats';


/**
 * takes care of fetching chats
 */
export function* fetchChatsAsync(action) {
  const { payload } = action;
  try {
    const response = yield call(fetchChats, { ...payload });

    if (response.error) {
      // in case of error
      yield put({
        type: FETCH_CHATS_ERROR,
        payload: {
          chats: [],
          error: response.error
        }
      });
      if (response.error.statusCode === 401) {
        yield put({
          type: AUTHORIZATION_REQUIRED
        });
        yield call(Actions.login);
      }
    } else {
      // success
      yield put({
        type: FETCH_CHATS_SUCCESS,
        payload: {
          chats: response
        }
      });
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: FETCH_CHATS_ERROR,
      error
    });
  }
}

export function* createChatAsync(action) {
  const { chat } = action.payload;
  try {
    const response = yield call(createChat, { ...chat });

    if (response.error) {
      // in case of error
      yield put({
        type: CREATE_CHAT_ERROR,
        payload: {
          error: response.error
        }
      });
    } else {
      // success
      yield put({
        type: CREATE_CHAT_SUCCESS,
        payload: {
          chat: { ...response, messages: [] }
        }
      });

      yield call(Actions.chat, { title: response.subject });
      // setTimeout(Actions.chat, 300);
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: CREATE_CHAT_ERROR,
      payload: {
        error
      },
    });
  }
}

export function* updateChatAsync(action) {
  const { chat } = action.payload;
  try {
    const response = yield call(updateChat, { ...chat });

    if (response.error) {
      // in case of error
      yield put({
        type: UPDATE_REMOTE_CHAT_ERROR,
        payload: {
          error: response.error
        }
      });
    } else {
      // success
      yield put({
        type: UPDATE_REMOTE_CHAT_SUCCESS,
        payload: {
          chat: response
        }
      });

      yield call(Actions.pop, { refresh: { currentChat: response }});
      // setTimeout(Actions.chat, 300);
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: UPDATE_REMOTE_CHAT_ERROR,
      payload: {
        error
      },
    });
  }
}


export function* deleteChatAsync(action) {
  const { payload } = action;
  try {
    const response = yield call(deleteChat, { ...payload });

    if (response.error) {
      // in case of error
      yield put({
        type: DELETE_CHAT_ERROR,
        payload: {
          error: response.error
        }
      });
    } else {
      // success
      yield put({
        type: DELETE_CHAT_SUCCESS,
        payload: {
          chat: payload
        }
      });

      yield call(Actions.pop, { refresh: {} });
      // setTimeout(Actions.chat, 300);
    }
  } catch (error) {
    console.log({ error });
    yield put({
      type: DELETE_CHAT_ERROR,
      payload: {
        error
      },
    });
  }
}

export function* watchFetchChats() {
  yield takeLatest(FETCH_CHATS_START, fetchChatsAsync);
}

export function* watchCreateChat() {
  yield takeLatest(CREATE_CHAT_START, createChatAsync);
}

export function* watchUpdateChat() {
  yield takeLatest(UPDATE_REMOTE_CHAT_START, updateChatAsync);
}

export function* watchDeleteChat() {
  yield takeLatest(DELETE_CHAT_START, deleteChatAsync);
}
