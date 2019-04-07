import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import HuntInfoCard from '../HuntInfoCard';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  huntsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  fab: {
    position: 'fixed',
    bottom: '16px',
    right: '16px'
  }
};

function HomePage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.huntsContainer}>
        <HuntInfoCard />
        <HuntInfoCard isLocked={false} />
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