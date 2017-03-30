// import { CREATE_CONTACT_SUCCESS } from './editCreateContact';
import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';

// Initial State
const initialState = {
  isFetching: false,
  isRefreshing: false,
  contacts: [],
  favorites: [],
  contactSearchResults: [],
  favoritesSearchResults: [],
  favoritesSearchLocation: {},
  error: null,
  isSearching: false,
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
export const SEARCH_FAVORITES_START = 'contacts/SEARCH_FAVORITES_START';
export const SEARCH_FAVORITES_SUCCESS = 'contacts/SEARCH_FAVORITES_SUCCESS';
export const SEARCH_FAVORITES_ERROR = 'contacts/SEARCH_FAVORITES_ERROR';
export const ADD_CONTACT_START = 'contacts/ADD_CONTACT_START';
export const ADD_CONTACT_SUCCESS = 'contacts/ADD_CONTACT_SUCCESS';
export const ADD_CONTACT_ERROR = 'contacts/ADD_CONTACT_ERROR';
export const REMOVE_CONTACT_START = 'contacts/REMOVE_CONTACT_START';
export const REMOVE_CONTACT_SUCCESS = 'contacts/REMOVE_CONTACT_SUCCESS';
export const REMOVE_CONTACT_ERROR = 'contacts/REMOVE_CONTACT_ERROR';
export const SEARCH_CONTACTS_START = 'contacts/SEARCH_CONTACTS_START';
export const SEARCH_CONTACTS_SUCCESS = 'contacts/SEARCH_CONTACTS_SUCCESS';
export const SEARCH_CONTACTS_ERROR = 'contacts/SEARCH_CONTACTS_ERROR';
export const GEOCODE_LOCATION_START = 'contacts/GEOCODE_LOCATION_START';
export const GEOCODE_LOCATION_SUCCESS = 'contacts/GEOCODE_LOCATION_SUCCESS';
export const GEOCODE_LOCATION_ERROR = 'contacts/GEOCODE_LOCATION_ERROR';
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

export const searchContacts = query => ({
  type: SEARCH_CONTACTS_START,
  payload: {
    query
  }
});

export const searchFavorites = searchData => ({
  type: SEARCH_FAVORITES_START,
  payload: {
    ...searchData
  }
});

// updates any key/value pair in the state
export const update = data => ({
  type: UPDATE_CONTACT,
  payload: {
    ...data
  }
});

export const geocodeLocation = location => ({
  type: GEOCODE_LOCATION_START,
  payload: {
    location,
    successAction: GEOCODE_LOCATION_SUCCESS,
    errorAction: GEOCODE_LOCATION_ERROR,
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
  searchContacts,
  searchFavorites,
  geocodeLocation,
};



const updateListItem = (list, id, valuesToUpdate) => {
  const newList = [...list];
  const index = _.findIndex(newList, { id });
  if (index !== -1) {
    newList[index] = { ...newList[index], ...valuesToUpdate };
  }

  return newList;
};



// Action Handlers
const actionsMap = {
  [REHYDRATE]: (state, action) => ({
    ...state,
    ...action.payload.contacts,
    isSearching: false,
    favoritesSearchResults: [],
    contactSearchResults: [],
  }),
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

  [SEARCH_CONTACTS_START]: state => ({
    ...state,
    contactSearchResults: [],
    isSearching: true,
  }),
  [SEARCH_FAVORITES_START]: state => ({
    ...state,
    favoritesSearchResults: [],
    isSearching: true,
  }),
  [SEARCH_CONTACTS_SUCCESS]: (state, action) => ({
    ...state,
    contactSearchResults: action.payload.result,
    isSearching: false,
  }),
  [SEARCH_FAVORITES_ERROR]: (state, action) => ({
    ...state,
    favoritesSearchResults: [],
    isSearching: false,
  }),
  [SEARCH_CONTACTS_ERROR]: (state, action) => ({
    ...state,
    contactSearchResults: [],
    isSearching: false,
  }),
  [SEARCH_FAVORITES_SUCCESS]: (state, action) => ({
    ...state,
    favoritesSearchResults: action.payload.result,
    isSearching: false,
  }),
  [GEOCODE_LOCATION_SUCCESS]: (state, action) => ({
    ...state,
    favoritesSearchLocation: action.payload,
  }),
  [ADD_CONTACT_SUCCESS]: (state, action) => {
    const { contact } = action.payload;
    const newList = updateListItem(state.favorites, contact.id, { isContact: true });

    return {
      ...state,
      favorites: newList,
    };
  },
  [ADD_FAVORITE_SUCCESS]: (state, action) => {
    const { contact } = action.payload;
    const newList = updateListItem(state.contacts, contact.id, { isFavorite: true });

    return {
      ...state,
      contacts: newList,
    };
  },
  [REMOVE_CONTACT_SUCCESS]: (state, action) => {
    const { id } = action.payload;
    const newList = updateListItem(state.favorites, id, { isContact: false });

    return {
      ...state,
      favorites: newList,
    };
  },
  [REMOVE_FAVORITE_SUCCESS]: (state, action) => {
    const { id } = action.payload;
    const newList = updateListItem(state.contacts, id, { isFavorite: false });

    return {
      ...state,
      contacts: newList,
    };
  },
};


// Reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
