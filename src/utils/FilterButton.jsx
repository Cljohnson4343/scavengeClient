import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles, withTheme } from '@material-ui/core';

const styles = theme => ({
    root: {
        borderColor: theme.palette.primary.main,
        minWidth: '26px',
        height: '26px',
        padding: 'unset',
    },
    font: {
        color: theme.palette.primary.main,
    }
});

function HuntInfoAddFilterButton(props) {
    const { children, classes, ...other } = props;

    return (
        <Button variant='outlined' className={classes.root} {...other} >
            {React.cloneElement(children, {classes: {root: classes.font}})}
        </Button>
    );
};

HuntInfoAddFilterButton.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
};

export default withTheme()(withStyles(styles)(HuntInfoAddFilterButton));