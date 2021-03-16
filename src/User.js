import React from 'react';
import { connect } from 'react-redux';

const User = (props) => {
  console.log(props);
  return <div>User details to follow</div>;
};

export default connect((state) => state)(User);
