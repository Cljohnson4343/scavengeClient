import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
    font: {
        fontSize: '0.4em',
        paddingRight: theme.spacing.unit/2,
        paddingLeft: theme.spacing.unit/2,
    },
    // Empty object to allow consumers to style text
    root: {
    },
});

function FilterButtonText(props) {
    const { classes, ...other } = props;

    return (
        <span 
            className={classNames(classes.font, classes.root)}
            {...other}
        >
            {props.children}
        </span>
    );
};

FilterButtonText.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withTheme()(withStyles(styles)(FilterButtonText));