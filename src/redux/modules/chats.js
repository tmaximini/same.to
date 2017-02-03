// import { CREATE_CHAT_SUCCESS } from './editCreateChat';

// Initial State
const initialState = {
  isFetching: false,
  isRefreshing: false,
  chats: [],
  currentChat: null,
  error: null,
};


// Constants (Actions)
export const FETCH_CHATS_START = 'chats/FETCH_CHATS_START';
export const FETCH_CHATS_SUCCESS = 'chats/FETCH_CHATS_SUCCESS';
export const FETCH_CHATS_ERROR = 'chats/FETCH_CHATS_ERROR';
export const UPDATE_CHAT = 'chats/UPDATE_CHAT';
export const SET_CHAT = 'chats/UPDATE_CHAT';



// Action Creators
export const fetchChats = () => ({
  type: FETCH_CHATS_START
});

// updates any key/value pair in the state
export const update = data => ({
  type: UPDATE_CHAT,
  payload: {
    ...data
  }
});

export const setCurrentChat = chat => ({
  type: SET_CHAT,
  payload: {
    chat
  }
});


// export all actions
export const actions = {
  fetchChats,
  update,
  setCurrentChat,
};



// Action Handlers
const actionsMap = {
  [FETCH_CHATS_START]: state => ({ ...state, isFetching: true }),
  [FETCH_CHATS_SUCCESS]: (state, action) => {
    const { chats } = action.payload;

    return {
      ...state,
      chats,
      isFetching: false,
    };
  },
  [FETCH_CHATS_ERROR]: state => ({ ...state, isFetching: false }),
  // TODO
  [UPDATE_CHAT]: state => ({ ...state }),
  // [CREATE_CHAT_SUCCESS]: (state, action) => {
  //   const { chat } = action.payload;

  //   // add new chat to list
  //   return {
  //     ...state,
  //     chats: [chat, ...state.chats],
  //   };
  // },
  [UPDATE_CHAT]: (state, action) => {
    const { key, value } = action.payload;
    const currentChat = {
      ...state.currentChat,
      [key]: value
    };

    return {
      ...state,
      currentChat,
    };
  },
  [SET_CHAT]: (state, action) => {
    const { chat } = action.payload;

    return {
      ...state,
      currentChat: chat,
    };
  },
};


// Reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
