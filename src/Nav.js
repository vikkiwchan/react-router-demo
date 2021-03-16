import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import faker from 'faker';
import { createUser } from './store';

// Link - higher order component that listens for hash changes
// props contains a history object in which you can extract the pathname
// You don't need to add hash listener to store, instead, Link becomes your single source of truth
const Nav = ({ create, users, location: { pathname } }) => {
  return (
    <nav>
      <Link to='/' className={pathname === '/' ? 'selected' : ''}>
        Home
      </Link>
      <Link to='/users' className={pathname === '/users' ? 'selected' : ''}>
        Users ({users.length})
      </Link>
      <button onClick={() => create(faker.name.firstName())}>Create</button>
    </nav>
  );
};

export default connect(
  (state) => state,
  (dispatch, { history }) => {
    console.log(history);
    return {
      create: (name) => {
        dispatch(createUser(name, history));
      },
    };
  }
)(Nav);
