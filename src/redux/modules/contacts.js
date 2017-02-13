// import { CREATE_CONTACT_SUCCESS } from './editCreateContact';

// Initial State
const initialState = {
  isFetching: false,
  isRefreshing: false,
  contacts: [],
  favorites: [],
  error: null,
};


// Constants (Actions)
export const FETCH_CONTACTS_START = 'contacts/FETCH_CONTACTS_START';
export const FETCH_CONTACTS_SUCCESS = 'contacts/FETCH_CONTACTS_SUCCESS';
export const FETCH_CONTACTS_ERROR = 'contacts/FETCH_CONTACTS_ERROR';
export const FETCH_FAVORITES_START = 'contacts/FETCH_FAVORITES_START';
export const FETCH_FAVORITES_SUCCESS = 'contacts/FETCH_FAVORITES_SUCCESS';
export const FETCH_FAVORITES_ERROR = 'contacts/FETCH_FAVORITES_ERROR';
export const ADD_FAVORITE_START = 'contacts/ADD_FAVORITE_START';
export const ADD_FAVORITE_SUCCESS = 'contacts/ADD_FAVORITE_SUCCESS';
export const ADD_FAVORITE_ERROR = 'contacts/ADD_FAVORITE_ERROR';
export const REMOVE_FAVORITE_START = 'contacts/REMOVE_FAVORITE_START';
export const REMOVE_FAVORITE_SUCCESS = 'contacts/REMOVE_FAVORITE_SUCCESS';
export const REMOVE_FAVORITE_ERROR = 'contacts/REMOVE_FAVORITE_ERROR';
export const ADD_CONTACT_START = 'contacts/ADD_CONTACT_START';
export const ADD_CONTACT_SUCCESS = 'contacts/ADD_CONTACT_SUCCESS';
export const ADD_CONTACT_ERROR = 'contacts/ADD_CONTACT_ERROR';
export const REMOVE_CONTACT_START = 'contacts/REMOVE_CONTACT_START';
export const REMOVE_CONTACT_SUCCESS = 'contacts/REMOVE_CONTACT_SUCCESS';
export const REMOVE_CONTACT_ERROR = 'contacts/REMOVE_CONTACT_ERROR';
export const UPDATE_CONTACT = 'contacts/UPDATE_CONTACT';



// Action Creators
export const fetchContacts = () => ({
  type: FETCH_CONTACTS_START
});

export const fetchFavorites = () => ({
  type: FETCH_FAVORITES_START
});

export const addFavorite = contact => ({
  type: ADD_FAVORITE_START,
  payload: {
    contact
  }
});

export const removeFavorite = contact => ({
  type: REMOVE_FAVORITE_START,
  payload: {
    contact
  }
});

export const addContact = contact => ({
  type: ADD_CONTACT_START,
  payload: {
    contact
  }
});

export const removeContact = contact => ({
  type: REMOVE_CONTACT_START,
  payload: {
    contact
  }
});

// updates any key/value pair in the state
export const update = data => ({
  type: UPDATE_CONTACT,
  payload: {
    ...data
  }
});


// export all actions
export const actions = {
  fetchContacts,
  fetchFavorites,
  update,
  addFavorite,
  addContact,
  removeFavorite,
  removeContact,
};



// Action Handlers
const actionsMap = {
  [FETCH_CONTACTS_START]: state => ({ ...state, isFetching: true }),
  [FETCH_FAVORITES_START]: state => ({ ...state, isFetching: true }),
  [FETCH_CONTACTS_SUCCESS]: (state, action) => {
    const { contacts } = action.payload;

    return {
      ...state,
      contacts,
      isFetching: false,
    };
  },
  [FETCH_FAVORITES_SUCCESS]: (state, action) => {
    const { favorites } = action.payload;

    return {
      ...state,
      favorites,
      isFetching: false,
    };
  },
  [FETCH_CONTACTS_ERROR]: state => ({ ...state, isFetching: false }),
  [FETCH_FAVORITES_ERROR]: state => ({ ...state, isFetching: false }),
  // TODO
  [UPDATE_CONTACT]: state => ({ ...state }),
  // [CREATE_CONTACT_SUCCESS]: (state, action) => {
  //   const { contact } = action.payload;

  //   // add new contact to list
  //   return {
  //     ...state,
  //     contacts: [contact, ...state.contacts],
  //   };
  // },
};


// Reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
