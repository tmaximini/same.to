import { takeLatest, call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import {
  FETCH_CHATS_START,
  FETCH_CHATS_SUCCESS,
  FETCH_CHATS_ERROR,
  CREATE_CHAT_START,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_ERROR,
} from '../modules/chats';
import {
  AUTHORIZATION_REQUIRED,
} from '../modules/auth';
import {
  fetchChats,
  createChat,
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
      // if (response.error.statusCode === 401) {
      //   yield put({
      //     type: AUTHORIZATION_REQUIRED
      //   });
      //   yield call(Actions.login);
      // }
    } else {
      // success
      yield put({
        type: CREATE_CHAT_SUCCESS,
        payload: {
          chat: response
        }
      });
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

export function* watchFetchChats() {
  yield takeLatest(FETCH_CHATS_START, fetchChatsAsync);
}

export function* watchCreateChat() {
  yield takeLatest(CREATE_CHAT_START, createChatAsync);
}
