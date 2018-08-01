import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount = async() => {
    const req = await fetch('/users');
    const users = await req.json();
    super.setState({users});
  }

  get users() {
    return this.state.users.map(user => (<li key={user.id}>{user.givenName} {user.familyName}</li>));
  }

  render() {
    return (
      <div>
        <h1 id="myDiv">Users</h1>
        <ul>{this.users}</ul>
      </div>
    );
  }
}

export default App;
