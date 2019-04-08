import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        borderStyle: 'solid',
        borderColor: theme.palette.divider,
        borderWidth: 'thin',
        borderRadius: theme.shape.borderRadius,
    },
    itemsContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    itemsHeaderContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.primary[200],
    },
    itemsHeaderContainerHeader: {
        paddingLeft: theme.spacing.unit
    },

});

function CardContainer(props) {
    const { children, classes, sort, title } = props;

    return (
        <div className={classes.root} > 
            <Paper 
                className={classes.itemsHeaderContainer}
                square={true}
            >
                <span className={classes.itemsHeaderContainerHeader}>{title}</span>
                {Boolean(sort) && sort}
            </Paper>
            <div className={classes.itemsContainer} >
                {children}
            </div>
        </div>
    );
};

CardContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
};

export default withTheme()(withStyles(styles)(CardContainer));