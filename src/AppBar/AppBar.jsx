import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';

import UserAvatar from '../UserAvatar';

const styles = theme => ({
  root: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  button: {
    margin: '10px'
  },
  avatar: {
    width: '30px',
    height: '30px',
    margin: '10px'
  },
  padRight: {
    paddingRight: "10px"
  },
  homeIconColor: {
    color: theme.palette.primary.contrastText
  }
});

function ScavengeAppBar(props) {
  const { classes, theme } = props;

  return (
    <AppBar className={classes.root} position="fixed" > 
      <IconButton 
        aria-label="Home" 
        color="primary" 
        classes={{colorPrimary: classes.homeIconColor}}
      >
         <LocationSearchingIcon />
      </IconButton>
      <UserAvatar className={classes.avatar} />
    </AppBar>
  );
}

ScavengeAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTheme()(withStyles(styles)(ScavengeAppBar));