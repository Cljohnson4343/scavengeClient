import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import HuntItemCard from '../HuntItemCard';
import { Button, Menu, MenuItem } from '@material-ui/core';

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
        sortMenuFont: {
            fontSize: '0.5em',
        },
        sortButton: {
            paddingRight: theme.spacing.unit
        },
        sortMenu: {
            backgroundColor: headerBackground
        }
    };
};

const compareByCompleted = function(a, b){
    if(a.isDone && !b.isDone) return -1;
    if(!a.isDone && b.isDone) return 1;
    return 0;
};
const compareByIncomplete = function(a, b){
    if(a.isDone && !b.isDone) return 1;
    if(!a.isDone && b.isDone) return -1;
    return 0;
};

const compareByPointsLowToHigh = function(a, b){ return a.points - b.points; };
const compareByPointsHighToLow = function(a, b){ return b.points - a.points; };

const compareByAlphabet = function(a, b) {
    if(a.name > b.name) return 1;
    if(b.name > a.name) return -1;
    return 0;
}

const sortFilters = {
    alphabetical: {
        displayString: 'Alphabetical',
        sortFunction: compareByAlphabet
    },
    incomplete: {
        displayString: 'Incomplete',
        sortFunction: compareByIncomplete
    },
    completed: {
        displayString: 'Completed',
        sortFunction: compareByCompleted
    },
    pointsLowToHigh: {
        displayString: 'Points: Low to High',
        sortFunction: compareByPointsLowToHigh
    },
    pointsHighToLow: {
        displayString: 'Points: High to Low',
        sortFunction: compareByPointsHighToLow
    }
};

function HuntItemCollection(props) {
    const { classes, huntItems } = props;

    const [ filter, setFilter ] = useState('completed');

    let sortMenuItems = [];
    for (let sortFilter in sortFilters) {
        sortMenuItems.push(
            <MenuItem 
                onClick={e => {
                    setFilter(sortFilter);
                    handleSortMenuClose(e);
                }}
                key={sortFilters[sortFilter].displayString}
            >
                {sortFilters[sortFilter].displayString}
            </MenuItem>
        );
    };

    const [ anchorEl, setAnchorEl ] = useState(null);
    const handleSortMenuClick = function(e) {
        setAnchorEl(e.currentTarget);
    };

    const handleSortMenuClose = function(e) {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root} > 
            <Paper className={classes.itemsHeaderContainer}>
                <span className={classes.itemsHeaderContainerHeader}>Hunt Items</span>
                <div className={classes.sortButton}>
                    <Button 
                        aria-owns='sort-menu'
                        aria-haspopup='true'
                        onClick={handleSortMenuClick}
                    >
                        <span className={classes.sortMenuFont}>Sort by: {sortFilters[filter].displayString}</span>
                    </Button>
                    <Menu
                        classes={{ paper: classes.sortMenu }}
                        id='sort-menu'
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)} 
                        onClose={handleSortMenuClose}
                    >
                        {sortMenuItems}
                    </Menu>
                </div>
            </Paper>
            <div className={classes.itemsContainer} >
                {huntItems.sort(sortFilters[filter].sortFunction)
                    .map(item => (
                    <HuntItemCard key={item.name} huntInfo={item} />
                ))}
            </div>
        </div>
    );
};

HuntItemCollection.propTypes = {
    classes: PropTypes.object.isRequired,
    huntItems: PropTypes.array.isRequired
};

export default withTheme()(withStyles(styles)(HuntItemCollection));