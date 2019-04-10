import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import HuntInfoContainer from '../HuntInfoContainer';
import hunts from '../HuntInfoData'; 

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: `calc(100vh - 51px - 56px - 32px)`,
    boxSizing: 'border-box',
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
    <div className={classes.page}>
      <HuntInfoContainer hunts={hunts}/>
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