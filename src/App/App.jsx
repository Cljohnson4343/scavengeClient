import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '../AppBar';
import { withStyles } from '@material-ui/core';
import MuiTheme from '../theme';
import HomePage from '../HomePage';

const styles = {
  pageWrapper: {
    boxSizing: 'border-box',
    height: '100vh',
    width: '100vw',
  },
}
class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={MuiTheme}>
        <div className={classes.pageWrapper} >
          <AppBar />
          <HomePage />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
