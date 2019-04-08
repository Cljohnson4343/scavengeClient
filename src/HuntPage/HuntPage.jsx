import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import HuntItemsContainer from '../HuntItemsContainer';

const styles = {
    itemContainer: {
        display: 'flex',
        flexDirection: 'column'
    }

};

const huntItems = [
    {
        name: "Santa Clause",
        points: 10,
        isDone: true
    },
    {
        name: "Snow globe",
        points: 30,
        isDone: false
    },
    {
        name: "Christmas Tree",
        points: 5,
        isDone: false
    },
    {
        name: "Reindeer on the Roof",
        points: 25,
        isDone: true

    },
]

function HuntPage(props) {
    const { classes } = props;

    return (
        <div className={classes.itemContainer} >
            <HuntItemsContainer huntItems={huntItems} 
                huntInfo={{ 
                }}
            />
        </div>
    );
};

HuntPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HuntPage);