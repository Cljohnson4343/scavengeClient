import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';

const styles = {
    font: {
        fontSize: '0.4em',
    },
    // Empty object to allow consumers to style text
    root: {
    },
};

function FilterButtonText(props) {
    const { classes } = props;

    return (
        <span 
            className={classNames(classes.font, classes.root)}
            {...props}
        >
            {props.children}
        </span>
    );
};

FilterButtonText.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterButtonText);