import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import HuntInfoCard from '../HuntInfoCard';

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

function HuntInfoContainer(props) {
    const { classes, hunts } = props;

    return (
        <div className={classes.root} > 
            <Paper 
                className={classes.itemsHeaderContainer}
                square={true}
            >
                <span className={classes.itemsHeaderContainerHeader}>Hunts</span>
            </Paper>
            <div className={classes.itemsContainer} >
                    {hunts.map(item => (
                    <HuntInfoCard key={item.name} huntInfo={item} />
                ))}
            </div>
        </div>
    );
};

HuntInfoContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    hunts: PropTypes.array.isRequired
};

export default withTheme()(withStyles(styles)(HuntInfoContainer));