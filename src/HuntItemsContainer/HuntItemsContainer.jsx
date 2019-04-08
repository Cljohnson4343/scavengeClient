import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import HuntItemCard from '../HuntItemCard';
import HuntItemsSortMenu from './HuntItemsSortMenu';

const styles = theme => {
    const headerBackground = theme.palette.primary[200];
    
    return {
        root: {
            display: 'flex',
            flexDirection: 'column',
        },
        itemsContainer: {
            display: 'flex',
            flexDirection: 'column'
        },
        itemsHeaderContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: headerBackground,
        },
        itemsHeaderContainerHeader: {
            paddingLeft: theme.spacing.unit
        },
    };
};

function HuntItemContainer(props) {
    const { classes, huntItems } = props;

    // use dummy initial sort function to preserve initial order
    const defaultSort = (a, b) => -1;
    const [ sortFunction, setSortFunction ] = useState(() => defaultSort);

    return (
        <div className={classes.root} > 
            <Paper className={classes.itemsHeaderContainer}>
                <span className={classes.itemsHeaderContainerHeader}>Hunt Items</span>
                <HuntItemsSortMenu handleChangeSort={setSortFunction} />
            </Paper>
            <div className={classes.itemsContainer} >
                {huntItems.sort(sortFunction)
                    .map(item => (
                    <HuntItemCard key={item.name} huntInfo={item} />
                ))}
            </div>
        </div>
    );
};

HuntItemContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    huntItems: PropTypes.array.isRequired
};

export default withTheme()(withStyles(styles)(HuntItemContainer));