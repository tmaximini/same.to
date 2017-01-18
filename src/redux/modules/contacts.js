import { CREATE_CONTACT_SUCCESS } from './editCreateContact';

// Initial State
const initialState = {
  isFetching: false,
  contacts: [],
  error: null,
};


// Constants (Actions)
export const FETCH_CONTACTS_START = 'contacts/FETCH_CONTACTS_START';
export const FETCH_CONTACTS_SUCCESS = 'contacts/FETCH_CONTACTS_SUCCESS';
export const FETCH_CONTACTS_ERROR = 'contacts/FETCH_CONTACTS_ERROR';
export const UPDATE_CONTACT = 'contacts/UPDATE_CONTACT';



// Action Creators
export const fetchContacts = () => ({
  type: FETCH_CONTACTS_START
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
  update,
};



// Action Handlers
const actionsMap = {
  [FETCH_CONTACTS_START]: state => ({ ...state, isFetching: true }),
  [FETCH_CONTACTS_SUCCESS]: (state, action) => {
    const { contacts } = action.payload;

    return {
      ...state,
      contacts,
      isFetching: false,
    };
  },
  [FETCH_CONTACTS_ERROR]: state => ({ ...state, isFetching: false }),
  // TODO
  [UPDATE_CONTACT]: state => ({ ...state }),
  [CREATE_CONTACT_SUCCESS]: (state, action) => {
    const { contact } = action.payload;

    // add new contact to list
    return {
      ...state,
      contacts: [contact, ...state.contacts],
    };
  },
};


// Reducer
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
