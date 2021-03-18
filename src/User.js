import React from 'react';
import { connect } from 'react-redux';
import { destroyUser } from './store';
import { Link } from 'react-router-dom';

const User = ({ user, destroy }) => {
  if (!user.id) {
    return '...loading user';
  }
  return (
    <div>
      User details for {user.name}
      <button onClick={() => destroy(user)}>x</button>
      <Link to={`/users/${user.id}/update`}>Update</Link>
    </div>
  );
};

// defensive option of extract the data you need, keeps the User component clean since the logic is maintained here
export default connect(
  (state, otherProps) => {
    const user =
      state.users.find((user) => user.id === otherProps.match.params.id * 1) ||
      {};
    return {
      user,
    };
  },
  (dispatch, { history }) => {
    return {
      destroy: (user) => dispatch(destroyUser(user, history)),
    };
  }
)(User);

// Previous way of writing User
/*
const User = ({
  users,
  match: {
    params: { id },
  },
}) => {
  id = id * 1; //will convert this to a num
  const user = users.find((user) => user.id === id);
  if (!user) {
    return null;
  }
  return <div>User details for {user.name}</div>;
};
*/
