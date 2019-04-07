import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Collapse, CardContent, TextField } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import classnames from 'classnames';

const styles = theme => ({
    centerIcon: {
        alignSelf: 'stretch',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    timeFieldsContainer: {
        display: 'flex',
    }
});

function HuntInfoCard(props) {
    const { classes } = props;
    const ResolvedLockIcon = props.isLocked ? <LockIcon /> : <LockOpenIcon />;

    const [ isExpanded, setExpanded ] = useState(false);

    return (
        <Card >
            <CardHeader
                avatar={
                    <IconButton disabled >
                        {ResolvedLockIcon}
                    </ IconButton>
                }
                classes={{ action: classes.centerIcon }} 
                title="Item 1"
                subheader="April 5 2019 9:00 AM" 
                action={
                    <IconButton
                        className={classnames(classes.expand, {
                        [classes.expandOpen]: isExpanded,
                        })}
                        onClick={() => setExpanded(!isExpanded)}
                        aria-expanded={isExpanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                }
            />
            <Collapse in={isExpanded} timeout='auto' unmountOnExit>
                <CardContent>
                    <div className={classes.textFieldContainer}>
                        <div className={classes.timeFieldsContainer}>
                            <TextField 
                                className={classes.textField}
                                defaultValue="9:00 AM"
                                label="Start Time"
                                id="start-time-read-only"
                                InputProps={{
                                    readOnly: true,
                                }}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField 
                                className={classes.textField}
                                defaultValue="10:00 AM"
                                label="End Time"
                                id="end-time-read-only"
                                InputProps={{
                                    readOnly: true,
                                }}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <TextField 
                            className={classes.textField}
                            defaultValue="2/4"
                            label="Number of Teams"
                            id="team-number-read-only"
                            InputProps={{
                                readOnly: true,
                            }}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField 
                            className={classes.textField}
                            defaultValue="Huntsville, Al"
                            label="Location"
                            id="location-read-only"
                            InputProps={{
                                readOnly: true,
                            }}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                </CardContent>
            </Collapse>
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

export default withTheme()(withStyles(styles)(HuntInfoCard));