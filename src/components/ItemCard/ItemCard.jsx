import React from "react";
import PropTypes from "prop-types";
import { withStyles, CardHeader, IconButton } from "@material-ui/core";
import { Card } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = theme => ({
  deleteIcon: {
    color: theme.palette.error.main
  },
  points: {
    alignSelf: "center",
    marginRight: theme.spacing(1)
  },
  root: {
    flex: "0 0 auto"
  },
  subheader: {},
  title: {
    fontSize: "0.9rem",
    lineHeight: "1.2"
  },
  videoIcon: {
    color: theme.palette.primary.main
  }
});

function ItemCard(props) {
  const {
    classes,
    huntInfo: { isDone }
  } = props;

  const ActionIcon = true ? (
    <DeleteIcon className={classes.deleteIcon} />
  ) : (
    <VideocamIcon className={classes.videoIcon} />
  );

  const handleDeleteMedia = function(e) {};

  const handleCaptureMedia = function(e) {
    const constraints = { video: true };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => console.log(stream))
      .catch(err => console.log(err));
  };

  const handleAction = isDone ? handleDeleteMedia : handleCaptureMedia;

  return (
    <Card square={true}>
      <CardHeader
        avatar={<IconButton onClick={handleAction}>{ActionIcon}</IconButton>}
        classes={{
          action: classes.points,
          title: classes.title,
          subheader: classes.subheader
        }}
        title={props.huntInfo.name}
        action={`${props.huntInfo.points} pts`}
      />
    </Card>
  );
}

ItemCard.propTypes = {
  huntInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
    points: PropTypes.number.isRequired
  }).isRequired
};

export default withStyles(styles)(ItemCard);
