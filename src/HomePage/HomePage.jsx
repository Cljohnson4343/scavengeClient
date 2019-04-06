import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  huntsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  huntItem: {

  },
};

function HomePage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.huntsContainer}>
        <div className={classes.huntItem}>Item 1</div>
        <div className={classes.huntItem}>Item 2</div>
      </div>
      <Fab color="primary" aria-label="Add" className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
  );
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);