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
    partnerFieldsContainer: {
        display: 'flex',
    }
});

function HuntInfoCard(props) {
    const { classes, huntInfo } = props;
    const ResolvedLockIcon = huntInfo.isOpen ? <LockOpenIcon /> : <LockIcon />;

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
                title={huntInfo.name}
                subheader={huntInfo.startTime.toDateString()}
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
                        <div className={classes.partnerFieldsContainer}>
                            <TextField 
                                className={classes.textField}
                                defaultValue={huntInfo.startTime.toLocaleTimeString('en-US')}
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
                                defaultValue={huntInfo.endTime.toLocaleTimeString('en-US')}
                                label="End Time"
                                id="end-time-read-only"
                                InputProps={{
                                    readOnly: true,
                                }}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div className={classes.partnerFieldsContainer}>
                            <TextField 
                                className={classes.textField}
                                defaultValue={`${huntInfo.numTeams}/${huntInfo.maxTeams}`}
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
                                defaultValue={huntInfo.items.length}
                                label="Number of Items"
                                id="hunt-item-number-read-only"
                                InputProps={{
                                    readOnly: true,
                                }}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <TextField 
                            className={classes.textField}
                            defaultValue={huntInfo.location}
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

HuntInfoCard.propTypes = {
    classes: PropTypes.object.isRequired,
    huntInfo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        isOpen: PropTypes.bool.isRequired,
        startTime: PropTypes.instanceOf(Date).isRequired,
        endTime: PropTypes.instanceOf(Date).isRequired,
        maxTeams: PropTypes.number.isRequired,
        numTeams: PropTypes.number.isRequired,
        items: PropTypes.array.isRequired,
        location: PropTypes.string.isRequired
    }).isRequired
};

export default withTheme()(withStyles(styles)(HuntInfoCard));