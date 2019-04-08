import React from 'react';
import PropTypes from 'prop-types';
import { CardHeader, IconButton } from '@material-ui/core';
import { Card } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import DeleteIcon from '@material-ui/icons/Delete';

function HuntItemCard(props) {
    const { huntInfo: { isDone } } = props;

    const ActionIcon = isDone ? <DeleteIcon /> : <VideocamIcon />;

    const handleDeleteMedia = function(e){
    };

    const handleCaptureMedia = function(e){
        const constraints = { video: true };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => console.log(stream))
            .catch(err => console.log(err));
    };

    const handleAction = isDone ? handleDeleteMedia : handleCaptureMedia;

    return (
        <Card>
            <CardHeader
                avatar={
                    <IconButton onClick={handleAction}>
                        {ActionIcon}
                    </IconButton>
                }
                title={props.huntInfo.name}
                subheader={`${props.huntInfo.points} pts`}
            />
        </Card>
    );
};
    
HuntItemCard.propTypes = {
    huntInfo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        isDone: PropTypes.bool.isRequired,
        points: PropTypes.number.isRequired
    }).isRequired
};
    
export default HuntItemCard;