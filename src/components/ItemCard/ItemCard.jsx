import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles, CardHeader, IconButton } from "@material-ui/core";
import { Card } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import { Item, Media } from "../../models";
import MediaUploader from "../MediaUploader";
import MediaPreview from "../MediaPreview";

const styles = theme => ({
  deleteIcon: {
    color: theme.palette.error.main
  },
  points: {
    alignSelf: "center",
    marginRight: theme.spacing(1)
  },
  previewBtn: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(0.5)
  },
  root: {
    flex: "0 0 auto"
  },
  subheader: {},
  title: {
    fontSize: "0.9rem",
    lineHeight: "1.2"
  }
});

function ItemCard(props) {
  const { classes, deleteMedia, item, media, uploadMedia } = props;

  const [previewingMedia, setPreviewingMedia] = useState(false);
  const isDone = !!deleteMedia;

  const handleDeleteMedia = function(e) {
    if (
      window.confirm(
        "Are you sure you want to delete the media for this Item?" +
          " If so, this item will no longer be 'found'."
      )
    ) {
      deleteMedia();
    }
  };

  const deleteAvatar = (
    <IconButton onClick={handleDeleteMedia}>
      <DeleteIcon className={classes.deleteIcon} />
    </IconButton>
  );

  const uploadAvatar = <MediaUploader name={item.name} upload={uploadMedia} />;

  const title = isDone ? (
    <span>
      {item.name}
      <IconButton
        className={classes.previewBtn}
        onClick={() => setPreviewingMedia(true)}
      >
        <LocalMoviesIcon color="primary" fontSize="small" />
      </IconButton>
    </span>
  ) : (
    item.name
  );

  if (previewingMedia) {
    return (
      <MediaPreview
        src={media.url}
        image
        label={item.name}
        setClosed={() => setPreviewingMedia(false)}
      />
    );
  }
  return (
    <Card square={true}>
      <CardHeader
        avatar={isDone ? deleteAvatar : uploadAvatar}
        classes={{
          action: classes.points,
          title: classes.title,
          subheader: classes.subheader
        }}
        title={title}
        action={`${item.points} pts`}
      />
    </Card>
  );
}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteMedia: PropTypes.func,
  item: PropTypes.instanceOf(Item).isRequired,
  media: PropTypes.instanceOf(Media),
  uploadMedia: PropTypes.func.isRequired
};

export default withStyles(styles)(ItemCard);
