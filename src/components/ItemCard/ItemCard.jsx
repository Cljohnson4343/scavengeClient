import React from "react";
import PropTypes from "prop-types";
import { withStyles, CardHeader, IconButton } from "@material-ui/core";
import { Card } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import DeleteIcon from "@material-ui/icons/Delete";
import { Item } from "../../models";

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
  const { classes, item } = props;

  const isDone = true;
  const ActionIcon = isDone ? (
    <DeleteIcon className={classes.deleteIcon} />
  ) : (
    <VideocamIcon className={classes.videoIcon} />
  );

  const handleDeleteMedia = function(e) {
    if (
      window.confirm(
        "Are you sure you want to delete the media for this Item?" +
          " If so, this item will no longer be 'found'."
      )
    ) {
    }
  };

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
        title={item.name}
        action={`${item.points} pts`}
      />
    </Card>
  );
}

ItemCard.propTypes = {
  item: PropTypes.instanceOf(Item).isRequired
};

export default withStyles(styles)(ItemCard);
