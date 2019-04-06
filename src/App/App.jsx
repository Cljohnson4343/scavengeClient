import React, { Component } from 'react';
import AppBar from '../AppBar';
import HomePage from '../HomePage';
import { withStyles } from '@material-ui/core';

const styles = {
  appBarOffset: {
    marginTop: '50px',
  },
}
class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar />
        <div className={classes.appBarOffset} >
          <HomePage />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
