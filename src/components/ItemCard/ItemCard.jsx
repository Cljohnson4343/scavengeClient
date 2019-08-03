import React from "react";
import PropTypes from "prop-types";
import { withStyles, CardHeader, IconButton } from "@material-ui/core";
import { Card } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Item, Location, Media } from "../../models";
import MediaUploader from "../MediaUploader";

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
  }
});

function ItemCard(props) {
  const { classes, item, location, teamID } = props;

  const isDone = false;

  const handleDeleteMedia = function(e) {
    if (
      window.confirm(
        "Are you sure you want to delete the media for this Item?" +
          " If so, this item will no longer be 'found'."
      )
    ) {
    }
  };

  const handleUploadMedia = e => {
    const media = new Media({
      itemID: item.itemID,
      location: location,
      teamID: teamID
    });
    media.fileToUpload = e.target.files[0];

    console.log("ItemCard");
    console.dir(media);

    media.apiCreateMedia().then();
  };

  const deleteAvatar = (
    <IconButton onClick={handleDeleteMedia}>
      <DeleteIcon className={classes.deleteIcon} />
    </IconButton>
  );

  const uploadAvatar = <MediaUploader upload={handleUploadMedia} />;

  return (
    <Card square={true}>
      <CardHeader
        avatar={isDone ? deleteAvatar : uploadAvatar}
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
  item: PropTypes.instanceOf(Item).isRequired,
  location: PropTypes.instanceOf(Location).isRequired,
  teamID: PropTypes.number.isRequired
};

export default withStyles(styles)(ItemCard);
