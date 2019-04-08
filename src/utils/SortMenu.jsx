import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import { Button, Menu, MenuItem } from '@material-ui/core';

const styles = theme => ({
        sortButton: {
            marginRight: theme.spacing.unit,
            backgroundColor: theme.palette.grey[200],
        },
        sortMenuFont: {
            fontSize: '0.5em',
        },
        sortMenu: {
            backgroundColor: theme.palette.grey[200],
        },
});

function SortMenu(props) {
    const { classes, handleChangeSort, sortFilters } = props;

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
                variant='outlined'
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

SortMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    handleChangeSort: PropTypes.func.isRequired,
    sortFilters: PropTypes.object.isRequired,
};

export default withTheme()(withStyles(styles)(SortMenu));