import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    itemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderStyle: 'solid',
        borderColor: theme.palette.divider,
        borderWidth: 'thin',
        borderRadius: theme.shape.borderRadius,
    },
    itemsHeaderContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    itemsHeaderContainerHeader: {
        paddingLeft: theme.spacing.unit
    },
    headerFirstLine: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    filtersContainer: {
        display: 'flex',

    },

});

function CardContainer(props) {
    const { children, classes, filters, sort, title } = props;

    return (
        <div className={classes.root} > 
            <Paper 
                className={classes.itemsHeaderContainer}
                elevation={0}
                square={true}
            >
                <div className={classes.headerFirstLine}>
                    <span className={classes.itemsHeaderContainerHeader}>{title}</span>
                    {Boolean(sort) && sort}
                </div>
                <div className={classes.filtersContainer}>
                    {Boolean(filters) && filters}
                </div>
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