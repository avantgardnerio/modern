import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    super.setState({
      users: []
    })
  }

  componentDidMount = async() => {
    const req = await fetch('/users');
    const users = await req.json();
    super.setState({users});
  }

  get users() {
    return this.state.users.map(user => (<li>{user.givenName} {user.familyName}</li>));
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        <ul>{this.users}</ul>
      </div>
    );
  }
}

export default App;
