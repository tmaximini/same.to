import { toggleArrayItem } from '../../utils';

const makeDefaultChat = () => ({
  subject: null,
  memberIds: []
});

// Initial State
const initialState = {
  isFetching: false,
  isRefreshing: false,
  chats: [],
  currentChat: makeDefaultChat(),
  error: null,
  isNew: true,
};


// Constants (Actions)
export const FETCH_CHATS_START = 'chats/FETCH_CHATS_START';
export const FETCH_CHATS_SUCCESS = 'chats/FETCH_CHATS_SUCCESS';
export const FETCH_CHATS_ERROR = 'chats/FETCH_CHATS_ERROR';
export const CREATE_CHAT_START = 'chats/CREATE_CHAT_START';
export const CREATE_CHAT_SUCCESS = 'chats/CREATE_CHAT_SUCCESS';
export const CREATE_CHAT_ERROR = 'chats/CREATE_CHAT_ERROR';
export const UPDATE_REMOTE_CHAT_START = 'chats/UPDATE_REMOTE_CHAT_START';
export const UPDATE_REMOTE_CHAT_SUCCESS = 'chats/UPDATE_REMOTE_CHAT_SUCCESS';
export const UPDATE_REMOTE_CHAT_ERROR = 'chats/UPDATE_REMOTE_CHAT_ERROR';
export const UPDATE_CHAT = 'chats/UPDATE_CHAT';
export const SET_CHAT = 'chats/SET_CHAT';
export const RESET_CHAT = 'chats/RESET_CHAT';
export const TOGGLE_CHAT_MEMBER = 'chats/TOGGLE_CHAT_MEMBER';



// Action Creators
export const fetchChats = () => ({
  type: FETCH_CHATS_START
});

export const createChat = chat => ({
  type: CREATE_CHAT_START,
  payload: {
    chat
  }
});

export const updateRemoteChat = chat => ({
  type: UPDATE_REMOTE_CHAT_START,
  payload: {
    chat
  }
});

// updates any key/value pair in the state
export const updateChat = (key, value) => ({
  type: UPDATE_CHAT,
  payload: {
    key,
    value,
  }
});

export const setCurrentChat = chat => ({
  type: SET_CHAT,
  payload: {
    chat
  }
});

export const resetChat = () => ({
  type: RESET_CHAT,
});

export const toggleChatMember = memberId => ({
  type: TOGGLE_CHAT_MEMBER,
  payload: {
    memberId
  }
});


// export all actions
export const actions = {
  fetchChats,
  updateChat,
  setCurrentChat,
  createChat,
  updateRemoteChat,
  toggleChatMember,
  resetChat,
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
  [TOGGLE_CHAT_MEMBER]: (state, action) => {
    const { memberId } = action.payload;

    return {
      ...state,
      currentChat: {
        ...state.currentChat,
        memberIds: toggleArrayItem(state.currentChat.memberIds, memberId)
      },
    };
  },
  [CREATE_CHAT_SUCCESS]: (state, action) => ({
    ...state,
    currentChat: action.payload.chat,
    isNew: false,
  }),
  [UPDATE_REMOTE_CHAT_SUCCESS]: (state, action) => ({
    ...state,
    currentChat: action.payload.chat,
    isNew: false,
  }),
  [RESET_CHAT]: (state) => ({
    ...state,
    currentChat: makeDefaultChat(),
    isNew: true,
  })
};


// Reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
