import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core';
import classNames from 'classnames';
import ClearIcon from '@material-ui/icons/Clear';

const styles = theme => ({
    font: {
        fontSize: '0.6em',
        paddingRight: theme.spacing.unit/2,
        paddingLeft: theme.spacing.unit/2,
    },
    // Empty object to allow consumers to style text
    root: {
        flex: '0 0 auto',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    icon: {
        fontSize: '0.7em',
        paddingRight: theme.spacing.unit/2,
    }
});

function FilterButtonText(props) {
    const { classes, ...other } = props;

    return (
        <div className={classes.container}>
            <span 
                className={classNames(classes.font, classes.root)}
                {...other}
            >
                {props.children}
            </span>
            <ClearIcon color='primary' classes={{ root: classes.font }} />
        </div>
    );
};

FilterButtonText.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withTheme()(withStyles(styles)(FilterButtonText));