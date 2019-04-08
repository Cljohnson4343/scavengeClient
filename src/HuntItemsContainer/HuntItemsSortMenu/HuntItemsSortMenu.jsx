import React from 'react';
import PropTypes from 'prop-types';
import { SortMenu } from '../../utils';

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

    return (
       <SortMenu sortFilters={sortFilters} {...props} /> 
    );
};

HuntItemsSortMenu.propTypes = {
    handleChangeSort: PropTypes.func.isRequired,
};

export default HuntItemsSortMenu;