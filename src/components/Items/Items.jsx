import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import ItemCard from "../ItemCard";
import ItemsSortMenu from "./ItemsSortMenu";
import Cards from "../Cards";
import { Items as ItemsModel, Location, Media, Medias } from "../../models";
import { useInterval } from "../../utils";

const styles = theme => ({
  itemsContainer: {
    marginTop: theme.spacing(0)
  },
  sortFont: {
    color: theme.palette.primary.main,
    fontSize: "0.9em",
    fontWeight: theme.typography.fontWeightRegular
  }
});

function HuntItemContainer(props) {
  const {
    classes,
    items,
    location,
    medias,
    setLoading,
    setMedias,
    teamID
  } = props;

  const [lastLoc, setLastLoc] = useState(location);

  useInterval(
    () => {
      if (lastLoc && !lastLoc.equals(location) && location) {
        const teamLoc = location.addTeamID(teamID);
        teamLoc.apiCreateLocation().then(res => {});
        setLastLoc(location);
      }
    },
    1000,
    []
  );

  const uploadMedia = itemID => {
    return e => {
      const media = new Media({
        itemID: itemID,
        location: location,
        teamID: teamID
      });
      media.fileToUpload = e.target.files[0];

      media.apiCreateMedia().then(res => {
        const m = new Media(res.data);
        setMedias(medias.add(m));
        setLoading(false);
      });
      setLoading(true);
    };
  };

  const deleteMedia = media => e => {
    media.apiDeleteMedia().then();
  };

  const defaultSort = (a, b) => -1;
  const [sortFunction, setSortFunction] = useState(() => defaultSort);

  return (
    <Cards
      classes={{ itemsContainer: classes.itemsContainer }}
      title="Hunt Items"
      sort={
        <ItemsSortMenu
          classes={{ sortMenuFont: classes.sortFont }}
          handleChangeSort={setSortFunction}
        />
      }
      withDivider={false}
    >
      {items.array.sort(sortFunction).map(item => {
        const media = medias.getMediaByItemID(item.itemID);
        return (
          <ItemCard
            key={item.itemID}
            item={item}
            deleteMedia={media ? deleteMedia(media) : undefined}
            uploadMedia={uploadMedia(item.itemID)}
          />
        );
      })}
    </Cards>
  );
}

HuntItemContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.instanceOf(ItemsModel).isRequired,
  location: PropTypes.instanceOf(Location),
  medias: PropTypes.instanceOf(Medias).isRequired,
  setLoading: PropTypes.func.isRequired,
  setMedias: PropTypes.func.isRequired
};

export default withStyles(styles)(HuntItemContainer);
