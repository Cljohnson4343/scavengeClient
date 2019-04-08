import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '../AppBar';
import { withStyles } from '@material-ui/core';
import MuiTheme from '../theme';
import HuntPage from '../HuntPage';

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
          <HuntPage />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
