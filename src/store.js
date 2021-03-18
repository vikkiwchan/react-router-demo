import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const LOAD = 'LOAD';
const CREATE_USER = 'CREATE_USER';
const DESTROY = 'DESTROY';
const UPDATE_USER = 'UPDATE_USER';

const usersReducer = (state = [], action) => {
  if (action.type === LOAD) {
    state = action.users;
  }
  if (action.type === CREATE_USER) {
    state = [...state, action.user];
  }
  if (action.type === DESTROY) {
    state = state.filter((user) => user.id !== action.user.id);
  }
  if (action.type === UPDATE_USER) {
    state = state.map((user) => {
      user.id !== action.user.id ? user : action.user;
    });
  }
  return state;
};

const reducer = combineReducers({ users: usersReducer });

const _loadUsers = (users) => ({ type: LOAD, users });

const _createUser = (user) => ({ type: CREATE_USER, user });

const _destroyUser = (user) => ({ type: DESTROY, user });

// THUNK
// Redux will recognize this to be a thunk bc it returns another func and passes dispatch
export const loadUsers = () => {
  return async (dispatch) => {
    const users = (await axios.get('/api/users')).data;
    dispatch(_loadUsers(users));
  };
};

export const createUser = (name, history) => {
  return async (dispatch) => {
    const user = (await axios.post('/api/users', { name })).data;
    dispatch(_createUser(user));
    history.push(`/users/${user.id}`);
  };
};

export const destroyUser = (user, history) => {
  return async (dispatch) => {
    await axios.delete(`/api/users/${user.id}`);
    dispatch(_destroyUser(user));
    history.push(`/users/`);
  };
};

const _updateUser = (user) => ({
  type: UPDATE_USER,
  user,
});

export const updateUser = (id, name, history) => {
  return async (dispatch) => {
    const user = await axios.put(`/api/users/${id}`, { name }).data;
    dispatch(_updateUser(user));
    history.push(`/users`);
  };
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
