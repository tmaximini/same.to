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
export const UPDATE_CONTACT = 'contacts/UPDATE_CONTACT';



// Action Creators
export const fetchContacts = () => ({
  type: FETCH_CONTACTS_START
});

export const fetchFavorites = () => ({
  type: FETCH_FAVORITES_START
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
