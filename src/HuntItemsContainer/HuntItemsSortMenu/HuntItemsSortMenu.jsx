import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import { Button, Menu, MenuItem } from '@material-ui/core';

const styles = theme => ({
        sortButton: {
            paddingRight: theme.spacing.unit
        },
        sortMenuFont: {
            fontSize: '0.5em',
        },
        sortMenu: {
            backgroundColor: theme.palette.primary[200],
        },

});

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
    unsorted: {
        displayString: '',
        sortFunction: () => -1
    },
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

function HuntItemsSortMenu(props) {
    const { classes, handleChangeSort } = props;

    const [ filter, setFilter ] = useState('unsorted');

    const [ anchorEl, setAnchorEl ] = useState(null);
    const handleSortMenuClick = function(e) {
        setAnchorEl(e.currentTarget);
    };

    const handleSortMenuClose = function(e) {
        setAnchorEl(null);
    };

    let sortMenuItems = [];
    for (let sortFilter in sortFilters) {
        sortMenuItems.push(
            <MenuItem 
                onClick={e => {
                    setFilter(sortFilter);
                    handleChangeSort(() => sortFilters[sortFilter].sortFunction);
                    handleSortMenuClose(e);
                }}
                key={sortFilters[sortFilter].displayString}
            >
                {sortFilters[sortFilter].displayString}
            </MenuItem>
        );
    };

    return (
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
    );
};

HuntItemsSortMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    handleChangeSort: PropTypes.func.isRequired,
};

export default withTheme()(withStyles(styles)(HuntItemsSortMenu));