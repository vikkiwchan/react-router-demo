import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import store, { loadUsers } from './store';

class _App extends Component {
  componentDidMount() {
    this.props.bootstrap();
  }
  render() {
    return (
      <div>
        <h1>Acme Users</h1>
        <ul>
          {this.props.users.map((user) => {
            return <li key={user.id}>{user.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

const App = connect(
  ({ users }) => ({ users }),
  (dispatch) => {
    return {
      bootstrap: () => dispatch(loadUsers()),
    };
  }
)(_App);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
