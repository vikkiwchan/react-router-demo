import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const LOAD = 'LOAD';

const usersReducer = (state = [], action) => {
  if (action.type === LOAD) {
    state = action.users;
  }
  return state;
};

const reducer = combineReducers({ users: usersReducer });

const _loadUsers = (users) => ({ type: LOAD, users });

// THUNK
// Redux will recognize this to be a thunk bc it returns another func and passes dispatch
export const loadUsers = () => {
  return async (dispatch) => {
    const users = (await axios.get('/api/users')).data;
    dispatch(_loadUsers(users));
  };
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
