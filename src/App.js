import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

class App extends Component {
  render() {
    return (
      <div className={this.props.classes.root}>
      My first hunt!!!
      </div>
    );
  }
}

export default withStyles(styles)(App);
