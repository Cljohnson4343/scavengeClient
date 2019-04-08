import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import HuntItemCard from '../HuntItemCard/HuntItemCard';

const styles = {
    itemContainer: {
        display: 'flex',
        flexDirection: 'column'
    }

};

function HuntPage(props) {
    const { classes } = props;

    return (
        <div className={classes.itemContainer} >
            <HuntItemCard 
                huntInfo={{ 
                    name: "Snow globe",
                    isDone: false
                }}
            />
            <HuntItemCard 
                huntInfo={{ 
                    name: "Santa Clause",
                    isDone: true
                }}
            />
        </div>
    );
};

HuntPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HuntPage);