import React from 'react';
import { connect } from 'react-redux';

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

export default connect((state) => state)(User);
