import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card,  
    CardContent, 
    CardHeader, 
    Collapse, 
    Divider, 
    IconButton, 
    TextField,
    withStyles, } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import classnames from 'classnames';
import * as hunt from '../hunt';
import * as loc from '../location';

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
    },
});

function HuntInfoCard(props) {
    const { classes, huntInfo } = props;
    const ResolvedLockIcon = hunt.isOpen(huntInfo) ? <LockOpenIcon /> : <LockIcon />;

    const [ isExpanded, setExpanded ] = useState(false);

    return (
        <Card square={true} elevation={0}>
            <CardHeader
                avatar={
                    <IconButton disabled >
                        {ResolvedLockIcon}
                    </ IconButton>
                }
                classes={{ action: classes.centerIcon }} 
                title={hunt.name(huntInfo)}
                subheader={hunt.starts(huntInfo).toDateString()}
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
                                defaultValue={hunt.starts(huntInfo).toLocaleTimeString('en-US')}
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
                                defaultValue={hunt.ends(huntInfo).toLocaleTimeString('en-US')}
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
                                defaultValue={`${hunt.numTeams(huntInfo)}/${hunt.maxTeams(huntInfo)}`}
                                label="Teams"
                                id="team-number-read-only"
                                InputProps={{
                                    readOnly: true,
                                }}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField 
                                className={classes.textField}
                                defaultValue={hunt.items(huntInfo).length}
                                label="Items"
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
                            defaultValue={loc.name(hunt.location(huntInfo))}
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
            <Divider variant='inset' />
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
        location: PropTypes.shape({
            name: PropTypes.string.isRequired,
            point: PropTypes.array.isRequired,
        }).isRequired
    }).isRequired
};

export default withTheme()(withStyles(styles)(HuntInfoCard));