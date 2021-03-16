import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import store, { loadUsers } from './store';
import { HashRouter as Router, Route } from 'react-router-dom';
import Users from './Users';
import User from './User';
import Nav from './Nav';

const Home = () => <hr />;

// 'exact' is strict about which component appears
class _App extends Component {
  componentDidMount() {
    this.props.bootstrap();
  }
  render() {
    return (
      <Router>
        <div>
          <h1>Acme Users</h1>
          <Route component={Nav} />
          <Route component={Home} path='/' exact />
          <Route component={Users} path='/users' />
          <Route component={User} path='/users/:id' />
        </div>
      </Router>
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
