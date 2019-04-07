import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const styles = {
  centerIcon: {
    alignSelf: 'stretch',
  }
};

function HuntInfoCard(props) {
    const { classes } = props;
    const ResolvedLockIcon = props.isLocked ? <LockIcon /> : <LockOpenIcon />;

    return (
        <Card >
            <CardHeader
                classes={{ action: classes.centerIcon }} 
                title="Item 1"
                subheader="April 5 2019 9:00 AM" 
                action={
                    <IconButton disabled >
                        {ResolvedLockIcon}
                    </ IconButton>
                }
            />
        </Card>
    );
};

HuntInfoCard.defaultProps = {
    isLocked: true,
};

HuntInfoCard.propTypes = {
    classes: PropTypes.object.isRequired,
    isLocked: PropTypes.bool.isRequired,
};

export default withStyles(styles)(HuntInfoCard);