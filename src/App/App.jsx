import React, { Component } from 'react';
import AppBar from '../AppBar';
import HomePage from '../HomePage';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <HomePage />
      </div>
    );
  }
}

export default App;
