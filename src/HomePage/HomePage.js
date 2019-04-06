import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

function HomePage(props) {
    return (
        <div className={props.classes.root}>
        Home Page!!!
        </div>
    );
}
export default withStyles(styles)(HomePage);