import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '../AppBar';
import HomePage from '../HomePage';
import { withStyles } from '@material-ui/core';
import MuiTheme from '../theme';

const styles = {
  appBarOffset: {
    marginTop: '70px',
  },
}
class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={MuiTheme}>
        <AppBar />
        <div className={classes.appBarOffset} >
          <HomePage />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
